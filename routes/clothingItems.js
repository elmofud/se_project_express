const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:userId", deleteItem);

router.use((reg, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
