const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });


const Items = sequelize.define('Items', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
  },
  minimumStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
  },
  maximumStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
  },
  image: {
    type: Sequelize.STRING,  // Store the image filename here
    allowNull: true
  },
 notification: {  // Add this field to store notifications
    type: DataTypes.STRING,
    allowNull: true,
  }
});
Items.associate = function (models) {
  Items.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categories'  // Alias for the relationship
  });

   // Association for many-to-many relationship with District
  Items.belongsToMany(models.District, {
    through: models.DistrictStock,
    foreignKey: 'item_id',
    as: 'districts',
  });
  
};
// sequelize.sync()
//   .then(() => console.log('Items table created'))
//   .catch(err => console.log('Error creating table:', err));
  
module.exports = Items;   