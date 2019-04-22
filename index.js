// implement your API here
const express = require("express");
//local
const db = require("./data/db");

const server = express();

server.get("/", (req, res) => {
  res.send("Server Running...");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.json({ error: err, message: "GET REQ FAILED" });
    });
});

server.listen(5000, () => {
  console.log("API RUNNING");
});
