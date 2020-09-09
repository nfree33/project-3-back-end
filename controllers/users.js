const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");
const config = require("../config/config");
const User = require("../models/user");

// User create route. AKA Signup:
router.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password && req.body.name) {
    // Hash the password:
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    User.findOne({ email: req.body.email }, (user) => {
      console.log("========findOne=======", user);
      if (!user) {
        console.log("Running create user");
        User.create(req.body, (error, createdUser) => {
          console.log("createdUser", createdUser);
          console.log("error", error);
          if (createdUser) {
            let payload = {
              id: createdUser.id,
              email: createdUser.email,
              iat: Date.now(),
            };
            console.log(payload);
            let token = jwt.encode(payload, config.jwtSecret);
            console.log(token);
            res.json({
              token: token,
            });
          } else {
            console.log("failed to create user");
            res.sendStatus(401);
          }
        });
      } else {
        console.log("User already exists, try logging in instead");
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// User sign-in route:
router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    console.log(req.body.email);
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error) console.log(error);
      if (user) {
        console.log("Found user. Checking password...");
        if (bcrypt.compareSync(req.body.password, user.password)) {
          console.log("Password correct, generating JWT...");
          let payload = {
            id: user.id,
            email: user.email,
            iat: Date.now(),
          };
          let token = jwt.encode(payload, config.jwtSecret);
          console.log(token);
          res.json({
            token: token,
          });
        } else {
          console.log("Wrong password");
          res.sendStatus(401);
        }
      } else {
        console.log("Couldn't find user. Try signing up.");
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Index route:
router.get('/', (req, res) => {
  User.find({}, (error, foundUsers) => {
    if (error) console.log(error)
    res.json(foundUsers)
  })
})

// Delete Route
router.delete("/:id", (req, res) => {
  // Delete document from collection
  User.findByIdAndRemove(req.params.id, (err, user) => {
    error ? res.status(404).json(error) : res.status(200).json(user);
  });
});

// Update Route
router.put("/:id", (req, res) => {
  console.log(req.body);
  // Update the user document using our model
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      error ? res.status(404).json(error) : res.status(200).json(updatedUser);
    }
  );
});

// Create Route
router.post("/", (req, res) => {
  console.log(req.body);
  // Use Model to create User Document
  User.create(req.body, (error, createdUser) => {
    // Once created - respond to client
    error ? res.status(404).json(error) : res.status(200).json(createdUser);
  });
});

// Edit Route
router.get('/:id/edit', (req,res) => {
  // Find our document from the collection - using mongoose model
  User.findById(req.params.id, (err, foundUser) => {
    error ? res.status(404).json(error) : res.status(200).json(foundUser);
  });
})


// Show Route
router.get("/:id", (req, res) => {
  // Find the specific document
  User.findById(req.params.id, (error, foundUsers) => {
    // render the Show route and pass it the foundUser
    error ? res.status(404).json(error) : res.status(200).json(foundUsers);
  });
});


module.exports = router;