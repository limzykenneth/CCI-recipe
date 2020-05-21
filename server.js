// server.js
// where your node app starts

const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());

// make all the files in "public" available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response){
	response.render("index");
});

app.get("/pancakes", function(request, response) {
	let recipes = fs.readFileSync("./recipes.json", {encoding: "utf8"});
	let recipesObj = JSON.parse(recipes);
	response.render("recipe", recipesObj.pancakes);
});

app.get("/tiramisu", function(request, response){
	let recipes = fs.readFileSync("./recipes.json", {encoding: "utf8"});
	let recipesObj = JSON.parse(recipes);
	response.render("recipe", recipesObj.tiramisu);
});

app.get("/teriyaki-chicken", function(request, response){
	let recipes = fs.readFileSync("./recipes.json", {encoding: "utf8"});
	let recipesObj = JSON.parse(recipes);
	response.render("recipe", recipesObj.teriyakiChicken);
});

app.get("/comments/:name", function(request, response){
	let recipeName = request.params.name;
	let comments = fs.readFileSync("./comments.json", {encoding: "utf8"});
	let commentsObj = JSON.parse(comments);
	response.json(commentsObj[recipeName]);
});

app.post("/comments/:name", function(request, response){
	let recipeName = request.params.name;
	let comments = fs.readFileSync("./comments.json", {encoding: "utf8"});
	let commentsObj = JSON.parse(comments);

	commentsObj[recipeName].push(request.body.comment);

	fs.writeFileSync("./comments.json", JSON.stringify(commentsObj), {encoding: "utf8"});
	response.send("New comment added");
});

// listen for requests :)
const listener = app.listen(8080, function() {
	console.log("Your app is listening on port " + listener.address().port);
});
