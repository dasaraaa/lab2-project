const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });


// Definimi i modelit Invoice
const Invoice = sequelize.define(
    "Invoice",
    {
        supplier_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
           
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "paid", "overdue"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        tableName: "invoices",
        timestamps: true, // createdAt dhe updatedAt do të krijohen automatikisht
    }
);
// // Verifikimi i lidhjes dhe sinkronizimi i tabelës
  sequelize.sync()
  .then(() => console.log('table created'))
  .catch(err => console.log('Error creating table:', err));

module.exports = Invoice;

