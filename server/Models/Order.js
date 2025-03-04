const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });
  const Order = sequelize.define('Order', {
    supplier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Delivered', 'Stopped'),
      defaultValue: 'Pending'
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  sequelize.sync()
  .then(() => console.log('Orders table created'))
  .catch(err => console.log('Error creating table:', err));

  module.exports = Order;
  