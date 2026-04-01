const router = require("express").Router();
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingItems");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

router.use("/items", clothingItemRoutes);
router.use(auth);
router.use("/users", userRoutes);

router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
});

module.exports = router;
