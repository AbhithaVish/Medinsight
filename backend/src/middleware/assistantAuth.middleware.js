const jwt = require("jsonwebtoken");
const HospitalAssistant = require("../models/HospitalAssistant");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "ASSISTANT") {
      return res.status(403).json({ message: "Invalid assistant token" });
    }

    const assistant = await HospitalAssistant.findByPk(decoded.id);

    if (!assistant) {
      return res.status(401).json({ message: "Assistant not found" });
    }

    req.assistant = assistant; // 🔥 THIS WAS MISSING
    next();
  } catch (err) {
    console.error("ASSISTANT AUTH ERROR:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
