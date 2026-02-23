const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  updateUser,
  createUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);

router.patch("/me", updateUser);
router.post("/", createUser);
module.exports = router;
