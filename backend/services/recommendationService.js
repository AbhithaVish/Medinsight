const db = require('../config/db'); // Assuming your DB connection is here

const getPersonalizedProducts = async (diagnosis) => {
    try {
        // Use the LIKE operator to find products where the diagnosis appears in the tags
        const query = `
            SELECT id, product_name, price, image_url, category 
            FROM products 
            WHERE tags LIKE ? 
            LIMIT 4
        `;
        const [rows] = await db.execute(query, [`%${diagnosis}%`]);
        return rows;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};

module.exports = { getPersonalizedProducts };