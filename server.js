require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); 
const passport = require("./config/passport")();

const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("open", () => {
  console.log("Mongo is Connected");
});
/* Middleware */
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/* Controller */
const userController = require("./controllers/users.js");
app.use("/users", userController);
app.use("/api/restaurants", require("./controllers/restaurants.js"));
app.use("/api/users", require("./controllers/users.js"));

/* Controller Ends here */

//LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});