const router = require("express").Router();
const controller = require("../controllers/consultant.controller");
const auth = require("../middleware/auth.middleware");

/* AUTH */
router.post("/register", controller.register);
router.post("/login", controller.login);

/* CONSULTANT */
router.get("/me", auth, controller.profile);
router.put("/me", auth, controller.updateProfile);

/* PUBLIC */
router.get("/public", controller.publicList);

module.exports = router;
