require("dotenv").config({ path: __dirname + "/.env" })
const port = process.env.PORT || 6000
const app = require("./app")
const dbconnection = require("../db/db")




const start = async()=>{
    try {
        await dbconnection()
        app.listen(port, ()=>{console.log("server listening on port " + port+"...")})
    } catch (error) {
        console.log("unnable to connnect to database", error)
    }
}

module.exports = start