const connectToDatabase = require("./dbConnection")
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];

// Option 1: Passing a connection URI
const dbConnection = async () => {
  const dbOptions = {
    // dialect: 'postgres',
    // database: 'postgres',
    // username: 'postgres',
    // password: "gbenga",
    // host: 'localhost',
    // port: 5432
  }

  return connectToDatabase(config)
}

module.exports = dbConnection
