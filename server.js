// server.js
// where your node app starts

const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response){
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/pancakes", function(request, response) {
  response.sendFile(__dirname + "/views/pancakes.html");
});

app.get("/tiramisu", function(request, response){
  response.sendFile(__dirname + "/views/tiramisu.html");
});

app.get("/teriyaki-chicken", function(request, response){
  response.sendFile(__dirname + "/views/teriyaki-chicken.html");
});

app.get("/comments", function(request, response){
  let comments = fs.readFileSync("./comments.txt", {encoding: "utf8"});
  let commentsArray = comments.split("\n");
  response.json(commentsArray);
});

app.post("/comments", function(request, response){
  let comments = fs.readFileSync("./comments.txt", {encoding: "utf8"});
  comments += "\n" + request.body.comment;
  fs.writeFileSync("./comments.txt", comments, {encoding: "utf8"});
  re
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
