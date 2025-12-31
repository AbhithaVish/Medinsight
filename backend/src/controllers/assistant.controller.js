const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HospitalAssistant = require("../models/HospitalAssistant");
const AssistantHospital = require("../models/AssistantHospital");

/* ---------------- REGISTER ---------------- */
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      experience_years,
      bio,
      hourly_rate,
      hospitals
    } = req.body;

    const exists = await HospitalAssistant.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const assistant = await HospitalAssistant.create({
      name,
      email,
      password: hashed,
      phone,
      experience_years,
      bio,
      hourly_rate
    });

    if (Array.isArray(hospitals)) {
      for (const h of hospitals) {
        await AssistantHospital.create({
          assistant_id: assistant.id,
          hospital_name: h.hospital_name,
          location: h.location
        });
      }
    }

    res.status(201).json({ message: "Assistant registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ---------------- LOGIN ---------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const assistant = await HospitalAssistant.findOne({ where: { email } });
    if (!assistant) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, assistant.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: assistant.id, type: "ASSISTANT" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ---------------- PROFILE ---------------- */
exports.me = async (req, res) => {
  res.json(req.assistant);
};

/* ---------------- UPDATE PROFILE ---------------- */
exports.updateProfile = async (req, res) => {
  await req.assistant.update(req.body);
  res.json({ message: "Profile updated" });
};

/* ---------------- PUBLIC LIST ---------------- */
exports.getAll = async (req, res) => {
  const assistants = await HospitalAssistant.findAll({
    attributes: { exclude: ["password"] },
    include: AssistantHospital
  });
  res.json(assistants);
};
