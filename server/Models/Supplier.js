const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });

// Definimi i modelit Supplier
const Supplier = sequelize.define('Supplier', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_info: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payment_terms: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'suppliers',
  timestamps: true  // This enables createdAt and updatedAt
});

// Verifikimi i lidhjes dhe sinkronizimi i tabelës
// sequelize.sync()
//   .then(() => console.log('Suppliers table created'))
//   .catch(err => console.log('Error creating table:', err));

module.exports = Supplier;
