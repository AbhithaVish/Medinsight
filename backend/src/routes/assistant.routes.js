const router = require("express").Router();
const controller = require("../controllers/assistant.controller");
const assistantAuth = require("../middleware/assistantAuth.middleware");

/* ---------- AUTH ---------- */
router.post("/register", controller.register);
router.post("/login", controller.login);

/* ---------- PROTECTED ---------- */
router.get("/me", assistantAuth, controller.me);
router.put("/me", assistantAuth, controller.updateProfile);

/* ---------- PUBLIC ---------- */
router.get("/public", controller.getAll);

module.exports = router;
