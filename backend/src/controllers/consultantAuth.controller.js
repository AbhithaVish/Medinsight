const Consultant = require("../models/Consultant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const consultant = await Consultant.create({
    ...req.body,
    password: hashed
  });
  res.json(consultant);
};

exports.login = async (req, res) => {
  const consultant = await Consultant.findOne({ where: { email: req.body.email } });
  if (!consultant) return res.status(401).json({ message: "Invalid" });

  const ok = await bcrypt.compare(req.body.password, consultant.password);
  if (!ok) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign(
    { id: consultant.id, role: "CONSULTANT" },
    process.env.JWT_SECRET
  );

  res.json({ token, role: "CONSULTANT" });
};
