const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "postgres"
})


const User = sequelize.define("User", {
  user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,}
  userName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,

})
