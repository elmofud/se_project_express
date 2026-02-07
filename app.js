const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

// create the following middleware
app.use((req, res, next) => {
  req.user = {
    _id: "69860f1739e1df1363eca8db",
  };
  next();
});

app.use("/items", clothingItemRoutes);
app.use("/users", userRoutes);

app.use((reg, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
