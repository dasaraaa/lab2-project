// models/DistrictRequest.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);

const District = require('./District'); // Ensure the path is correct
const Items = require('./Items'); // Assuming you have an Item model

const DistrictRequest = sequelize.define('DistrictRequest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  districtId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: District,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Items,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requestedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  status: {  // Add the status field
    type: DataTypes.STRING,
    allowNull: true,  // It can be null initially (pending status), or you can set a default value
    defaultValue: 'pending',  // Default status if not provided
  },
}, {
  sequelize,
  modelName: 'DistrictRequest',
  tableName: 'district_requests',
  timestamps: false,
});


// Associations
District.hasMany(DistrictRequest, { foreignKey: 'districtId' });
DistrictRequest.belongsTo(District, { foreignKey: 'districtId' });

Items.hasMany(DistrictRequest, { foreignKey: 'itemId' });
DistrictRequest.belongsTo(Items, { foreignKey: 'itemId' });



// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database synchronized successfully.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);

// });



module.exports = DistrictRequest;
