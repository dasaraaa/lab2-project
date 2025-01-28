const express = require("express");
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());  // Ensure this is added to handle JSON requests
app.use(cors());

// MongoDB connection
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
}

// MySQL connection using Sequelize
const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql",
});

// Test MySQL connection
sequelize.authenticate()
  .then(() => {
    console.log("MySQL connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to MySQL:", err);
  });

const UsersRouter = require("./Routes/Users");
app.use("/auth", UsersRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Connect to both MongoDB and MySQL
connectMongoDB();

module.exports = sequelize;
