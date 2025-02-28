const express = require("express");
const router = express.Router();
const { Admin } = require("../Models/Admin");
const bcrypt = require("bcrypt");

// Registration Route
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await Admin.create({
        username: username,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      

    // Send success response after the user is created
    res.json("Successfully added!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating user." });
  }
});

// Sign-in Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  try {
    // Find the user by email
    console.log("Looking for admin with email:", email);
    const admin = await Admin.findOne({ where: { email: email } });
    console.log("Admin found:", admin);
    
    // Check if user was found
    if (!admin) {
      return res.status(404).json({ error: "Admin doesn't exist!" });
    }
    
    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Wrong email/password combination!" });
    }

    // If password matches, send success response
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
