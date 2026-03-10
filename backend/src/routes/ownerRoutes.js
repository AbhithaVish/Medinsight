const express = require("express");
const router = express.Router();

const { getOwnerStats } = require("../controllers/ownerDashboardController");

router.get("/owner/stats/:shopId", getOwnerStats);

module.exports = router;