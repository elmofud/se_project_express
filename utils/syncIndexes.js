const mongoose = require("mongoose");
const User = require("./models/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => User.syncIndexes())
  .then(() => {
    console.log("Indexes synced");
    process.exit();
  });
