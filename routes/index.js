const router = require("express").Router();
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingItems");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// ── PUBLIC ROUTES ────────────────────────────────────────────────
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

// ── BOUNCER ──────────────────────────────────────────────────────
router.use(auth);

// ── PROTECTED ROUTES ─────────────────────────────────────────────
router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

// ── 404 FALLBACK ─────────────────────────────────────────────────
router.use((req, res) => {
  res
    .status(ERROR_CODES.NOT_FOUND)
    .send({ message: ERROR_MESSAGES.RESOURCE_NOT_FOUND });
});

module.exports = router;
