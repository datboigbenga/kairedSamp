require("dotenv").config({ path: __dirname + "/.env" })
module.exports = {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }

  
}