const express = require("express");
const router = express.Router();
const { Users } = require("../Models/Users");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../Middlewares/AuthMiddleware");

// Registration Route
router.post("/", async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    // Kontrollo nëse përdoruesi ekziston
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash passwordin për siguri
    const hashedPassword = await bcrypt.hash(password, 10);

    // Krijo përdoruesin në databazë
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role || "staff", // Roli default është "staff"
    });

    res.status(201).json({ message: "User successfully registered!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating user." });
  }
});

// Sign-in Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Gjej përdoruesin në databazë
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist!" });
    }

    // Verifiko passwordin
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Wrong email/password combination!" });
    }

    // Gjenero token-in e autentifikimit
    const accessToken = sign(
      { id: user.id, name: user.name, role: user.role },
      "importantsecret",
      { expiresIn: "1h" }
    );

    // Kthe përgjigjen me token dhe rolin e përdoruesit
    return res.status(200).json({
      message: "Logged in successfully",
      accessToken,
      role: user.role, // Kthejmë rolin që frontend-i ta përdorë
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint për të verifikuar nëse një përdorues është i loguar dhe cili është roli i tij
router.get("/auth", validateToken, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, role: req.user.role });
});

// Endpoint për të marrë numrin total të përdoruesve
router.get("/count", async (req, res) => {
  try {
    const userCount = await Users.count();
    res.json({ count: userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
