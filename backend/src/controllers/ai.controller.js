const { PythonShell } = require("python-shell");
const Product = require("../models/Product");

exports.getAIRecommendations = async (req, res) => {

  const userId = req.user.id;

  let options = {
    scriptPath: "ai",
    args: [userId]
  };

  PythonShell.run(
    "recommendation_model.py",
    options,
    async (err, result) => {

      if (err) return res.status(500).json(err);

      const ids = JSON.parse(result[0]);

      const products = await Product.findAll({
        where: { id: ids }
      });

      res.json(products);
    }
  );
};