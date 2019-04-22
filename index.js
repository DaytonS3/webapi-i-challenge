// implement your API here
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Server Running...");
});

server.listen(5000, () => {
  console.log("API RUNNING");
});
