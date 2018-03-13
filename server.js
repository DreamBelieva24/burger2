var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mysql = require("mysql");


var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgers_db",
  port: 8889
})

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});

connection.connect(function(err){
  if(err) throw err;
  console.log("connected as id" + connection.threadId);
})

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burger;", function(err,data){
    res.render('index', {burger: data})
  })

})

app.post("/create", function(req, res) {
  connection.query("INSERT INTO burger (burger_name) VALUES (?);", [req.body.name], function(err,data){
    res.redirect('/')
  })

})

// document.getElementById('ready').addEventListener('click', function () {
//   console.log("You finally clicked without jQuery");
// });



function update(){
  app.put("/update", function(req, res) {
    connection.query("UPDATE burger SET devoured = ? WHERE id = ?;", [true, req.body.id], function(err,data){
      res.redirect('/')
    })
  
  })
}