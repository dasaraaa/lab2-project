const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require("cors");

app.use(express.json());
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

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("MySQL connected successfully!");
  }
});



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Connect to both MongoDB and MySQL
connectMongoDB();
