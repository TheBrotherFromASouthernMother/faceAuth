const Sequelize = require("sequelize");
require("dotenv").config()
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})


const User = sequelize.define("User", {
  user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  userName: { type: Sequelize.STRING, allowNull: false },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  verification_image: { type: Sequelize.STRING, allowNull: true }
})
