const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/ai.controller");

router.get("/", auth, controller.getAIRecommendations);

module.exports = router;