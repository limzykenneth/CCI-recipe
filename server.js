// server.js
// where your node app starts

const express = require("express");
const fs = require("fs");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/comments", function(request, response){
  let comments = fs.readFileSync("./comments.txt");
  console.log(comments);
  response.json({});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
