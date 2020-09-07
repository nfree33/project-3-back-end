const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name:  { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    photo: {type: String, required: false},
    favorites: {type: Array, required: false},
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
