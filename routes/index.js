const router = require("express").Router();
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingItems");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
});

module.exports = router;
