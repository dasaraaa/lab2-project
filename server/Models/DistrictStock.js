const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

// Import the models correctly
const District = require("../Models/District");
const Items = require("../Models/Items");

const DistrictStock = sequelize.define("DistrictStock", {
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'items', // This should be 'items' (lowercase)
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'districts', // This should be 'districts' (lowercase)
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: "district_stock",  // Define the table name in DB
  timestamps: true              // Enable timestamps if you want 'createdAt' & 'updatedAt'
});

// Synchronize the DistrictStock table
// sequelize.sync()
//   .then(() => console.log('DistrictStock table created'))
//   .catch(err => console.log('Error creating table:', err));

module.exports = DistrictStock;
