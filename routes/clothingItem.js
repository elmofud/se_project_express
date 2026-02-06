const router = require("express").Router();
const {
  getclothingUtems,
  createstClothingItems,
  deleteClothingItems,
} = require("../controllers/clothingItems");

router.get("/:userId", getClothingItems);
router.post("/", createClothingItem);
router.delete("/", deleteClothingItem);

module.exports = router;
