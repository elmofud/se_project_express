const router = require("express").Router();
const {
  getCurrentUser,
  updateUser,
  createUser,
} = require("../controllers/users");

router.get("/me", getCurrentUser);

router.patch("/me", updateUser);
router.post("/", createUser);
module.exports = router;
