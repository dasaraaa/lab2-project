const express = require("express");
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const path = require("path")


app.use(express.json()); // Instead of body-parser
app.use(cors());
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
// async function connectMongoDB() {
//   try {
//     await mongoose.connect(process.env.DB_URL);
//     console.log("MongoDB connected successfully!");
//   } catch (err) {
//     console.log("Error connecting to MongoDB:", err);
//   }
// }

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

//ROUTERS
const UsersRouter = require("./Routes/Users");
app.use("/auth", UsersRouter);
const CategoryRouter= require("./Routes/Category");
app.use("/category", CategoryRouter);
const DistrictRouter = require("./Routes/District");
app.use("/district", DistrictRouter);
const ItemsRoute = require("./Routes/Items");
app.use("/items", ItemsRoute);
const SupplierRoute = require("./Routes/Supplier");
app.use("/supplier", SupplierRoute);
const OrderRoute = require("./Routes/Order");
app.use("/orders", OrderRoute);
const districtRequest = require('./Routes/DistrictRequest');
app.use("/api/district-requests", districtRequest);
const AdminRoute = require("./Routes/Admin");
app.use("/admin", AdminRoute);
const DistrictStock = require("./Routes/DistrictStock")
app.use("/districtStock", DistrictStock)
const Invoice= require("./Routes/Invoice");
app.use("/invoices", Invoice);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Connect to both MongoDB and MySQL
// connectMongoDB();

module.exports = sequelize;
