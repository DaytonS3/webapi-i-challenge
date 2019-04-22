// implement your API here
const express = require("express");
//local
const db = require("./data/db");

const server = express();

server.use(express.json());

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

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  db.insert({ name, bio })
    .then(users => {
      if (!name || !bio) {
        res.status(400).json({
          error: err,
          Message: "Please provide name and bio for the user."
        });
      } else {
        res.status(201).send(users);
      }
    })
    .catch(err => {
      userError(400, "Please provide name and bio for the user.");
    });
});

server.delete("/api/users/:id", (req, res) => {
  const UserId = req.params.id;
  db.remove(UserId)
    .then(del => {
      res.status(204).end();
    })
    .catch(err => {
      res.json({ Error: err, message: "Error Deleting" });
    });
});

server.listen(5000, () => {
  console.log("API RUNNING");
});
