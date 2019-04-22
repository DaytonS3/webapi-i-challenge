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
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  const UserId = req.params.id;
  db.findById(UserId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      Message: "Please provide name and bio for the user."
    });
  }
  db.insert({ name, bio })
    .then(users => {
      res.status(201).send(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const UserId = req.params.id;
  if (UserId !== UserId) {
  }
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
