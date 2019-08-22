var express = require("express");
var server = express();

//Inicial configuration
server.get("/", function(req, res) {
  res.send("Hello World!");
});

//Server port: http://localhost:3000
server.listen(3000);
