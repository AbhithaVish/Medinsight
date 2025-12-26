const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

// Register
router.post("/register", controller.register);

// Login
router.post("/login", controller.login);

// Get logged-in user profile
router.get("/me", auth, controller.me);


module.exports = router;
