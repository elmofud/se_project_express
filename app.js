const express = require("express");
const mongoose = require("mongoose");
// const userRoutes = require("./routes/users");
const routes = require("./routes/index");
const { ERROR_CODES, ERROR_MESSAGES } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "69860f1739e1df1363eca8db",
  };
  next();
});

// app.use("/users", userRoutes);

// app.use((req, res) => {
//   res
//     .status(ERROR_CODES.NOT_FOUND)
//     .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
// });

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
