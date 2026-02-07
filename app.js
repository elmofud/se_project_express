const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/items", clothingItemRoutes);

app.use((reg, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
// create the following middleware
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
