const express = require('express');
const router = express.Router();
const { getPersonalizedProducts } = require('../services/recommendationService');

router.get('/suggest', async (req, res) => {
    const { diagnosis } = req.query; // e.g., /api/recommendations/suggest?diagnosis=Fracture
    
    if (!diagnosis) {
        return res.status(400).json({ message: "Diagnosis is required" });
    }

    const products = await getPersonalizedProducts(diagnosis);
    res.json(products);
});

module.exports = router;