const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.js");

// Index
router.get("/", (req, res) => {
  // Use Restaurant model to get all Restaurants
  Restaurant.find({}, (error, allRestaurants) => {
    error ? res.status(404).json(error) : res.status(200).json(allRestaurants);
  });
});

// Delete
router.delete("/:id", (req, res) => {
  // Delete document from collection
  Restaurant.findByIdAndRemove(req.params.id, (err, restaurant) => {
    error ? res.status(404).json(error) : res.status(200).json(restaurant);
  });
});

// Update
router.put("/:id", (req, res) => {
  console.log(req.body);
  // Update the restaurant document using our model
  Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRestaurant) => {
      error ? res.status(404).json(error) : res.status(200).json(updatedRestaurant);
    }
  );
});

// Create
router.post("/", (req, res) => {
  console.log(req.body);
  // Use Model to create Restaurant Document
  Restaurant.create(req.body, (error, createdRestaurant) => {
    // Once created - respond to client
    error ? res.status(404).json(error) : res.status(200).json(createdRestaurant);
  });
});

// Show
router.get("/:id", (req, res) => {
  // Find the specific document
  Restaurant.findById(req.params.id, (error, foundRestaurant) => {
    // render the Show route and pass it the foundRestaurant
    error ? res.status(404).json(error) : res.status(200).json(foundRestaurant);
  });
});

// export router
module.exports = router;
