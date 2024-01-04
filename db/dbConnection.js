const db = require("../models")

const connectToDatabase = async (options) => {
  const sequelize = new db.Sequelize(options)
  await sequelize.authenticate();
  console.log("Connection has been established successfully.")

  return sequelize
}

module.exports = connectToDatabase
