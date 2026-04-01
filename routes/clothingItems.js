const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  dislikeItem,
  likeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.use(auth);
router.post("/", validateCardBody, createItem);
router.delete("/:id", validateId, deleteItem);

router.put("/:id/likes", validateId, likeItem);
router.delete("/:id/likes", validateId, dislikeItem);

module.exports = router;
