var pg = require('pg');
pg.defaults.ssl = true;
//https://stackoverflow.com/a/44982870/8865999
// - Bug in the sequelize package has issue with ssl certificates thus you have to import pg and set ssl to true

const Sequelize = require("sequelize");
require("dotenv").config()
console.log(process.env)
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.PASSWORD, {
  host: process.env.DB_HOST,
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
  verification_image: { type: Sequelize.STRING, allowNull: true },
  isAdmin: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
})

User.sync({force: false}).then(() => {
  // Table created
  return User.create({
    userName: "TheBrotherFromASouthernMother",
    firstName: 'Christian',
    lastName: 'Lowe',
    email: 'christglowe@gmail.com',
    password: "portfolio2018",
    verification_image: "./confirmed_users/TheBrotherFromASouthernMother.jpg",
    isAdmin: true
  });
});

//WARNING: When using SQL commands on database, sequlize stores table names with paraentheses, so SELECT * FROM Users; should be SELECT * from "Users";
//https://stackoverflow.com/a/695312/8865999
module.exports.sequelize = sequelize;
module.exports.User = User;
