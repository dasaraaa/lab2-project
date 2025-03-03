const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });


const District = sequelize.define('District', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

District.associate = function (models) {
  District.belongsToMany(models.Items, {
    through: models.DistrictStock,
    foreignKey: 'district_id',
    as: 'items',  // Alias for items in a district
  });
};


  sequelize.sync()
  .then(() => console.log('Items table created'))
  .catch(err => console.log('Error creating table:', err));
  
module.exports = District;   