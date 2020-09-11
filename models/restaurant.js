const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RestaurantSchema = new Schema(
    {
        name:  { type: String, required: true },
        city: { type: String, required: true},
        address: { type: String, required: true },
        likes: {type: Number, required: true},
        reviews: {type: Array, required: false},
        image_url: { type: String, required: true },
      },
      { timestamps: true }
    );

//  Create Model from our Schema
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

// Export Restaurant Model
module.exports = Restaurant;
