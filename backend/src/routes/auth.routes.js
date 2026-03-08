const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

// Register
router.post("/register", controller.register);

// Login
router.post("/login", controller.login);

// Get logged-in user
router.get("/me", auth, controller.me);

// Update logged-in user profile
router.put("/me", auth, controller.updateMe);

module.exports = router;