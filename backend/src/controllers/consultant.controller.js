const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Consultant = require("../models/Consultant");
const ConsultantHospital = require("../models/ConsultantHospital");

const JWT_SECRET = process.env.JWT_SECRET;

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      experience_years,
      hourly_rate,
      bio,
      hospitals
    } = req.body;

    const exists = await Consultant.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const consultant = await Consultant.create({
      name,
      email,
      password: hashed,
      phone,
      experience_years,
      hourly_rate,
      bio
    });

    if (Array.isArray(hospitals)) {
      for (const h of hospitals) {
        await ConsultantHospital.create({
          hospital_name: h.hospital_name,
          location: h.location,
          consultant_id: consultant.id
        });
      }
    }

    res.status(201).json({ message: "Consultant registered successfully" });
  } catch (err) {
    console.error("CONSULTANT REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const consultant = await Consultant.findOne({ where: { email } });
    if (!consultant) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, consultant.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: consultant.id, role: "CONSULTANT" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: "CONSULTANT",
      consultant: {
        id: consultant.id,
        name: consultant.name,
        email: consultant.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ================= PROFILE ================= */
exports.profile = async (req, res) => {
  const consultant = await Consultant.findByPk(req.user.id, {
    include: ConsultantHospital
  });

  res.json(consultant);
};

/* ================= UPDATE PROFILE ================= */
exports.updateProfile = async (req, res) => {
  const consultant = await Consultant.findByPk(req.user.id);

  await consultant.update(req.body);

  res.json({ message: "Profile updated" });
};

/* ================= PUBLIC LIST ================= */
exports.publicList = async (req, res) => {
  const consultants = await Consultant.findAll({
    attributes: [
      "id",
      "name",
      "experience_years",
      "hourly_rate",
      "phone",
      "bio"
    ],
    include: {
      model: ConsultantHospital,
      attributes: ["hospital_name", "location"]
    }
  });

  res.json(consultants);
};
