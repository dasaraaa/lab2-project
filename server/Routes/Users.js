const express = require("express");
const router = express.Router();
const { Users } = require("../Models/Users");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken")
const{validateToken} = require("../Middlewares/AuthMiddleware")
// Registration Route
router.post("/", async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber
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
    return res.json({ error: "User doesn't exist!" });
  }

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email: email } });

    // Check if user was found
    if (!user) {
      return res.json({ error: "User doesn't exist!" });
    }
    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong email/password combination!" });
    }
    const accessToken = sign({name: user.name, id:user.id}, 
      "importantsecret" 
    )
    // If password matches, send success response
    return res.status(200).json({ message: "Logged in successfully" , accessToken});
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }

});
router.get("/auth", validateToken, (req,res) => {
  res.json(req.user);
})

module.exports = router;
