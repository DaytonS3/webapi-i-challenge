// implement your API here
const express = require("express");
//local
const db = require("./data/db");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server Running...");
});

//Get All Users
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

//Get User By Id
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

//Add New User
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

//Delete User By Id
server.delete("/api/users/:id", (req, res) => {
  const UserId = req.params.id;
  db.remove(UserId)
    .then(user => {
      if (user) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//Update User By Id
server.put("/api/users/:id", (req, res) => {
  const UserId = req.params.id;
  const UpdateUser = req.body;

  if (!UpdateUser.name || !UpdateUser.bio) {
    res.status(400).json({
      Message: "Please provide name and bio for the user."
    });
  }
  db.update(UserId, UpdateUser)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

server.listen(5000, () => {
  console.log("API RUNNING");
});
