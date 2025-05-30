const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });
  

const Users = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {  // Shtojmë fushën për rolin e përdoruesit
        type: DataTypes.ENUM('admin', 'manager', 'staff'), // Mund të ndryshosh sipas nevojës
        allowNull: false,
        defaultValue: 'staff',  // Përdoruesit e rinj marrin automatikisht rolin 'staff'
    }


});

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);

// });


module.exports = { sequelize, Users };
