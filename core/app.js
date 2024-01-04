const express = require("express")
const cors = require("cors")
const path = require("path")
const compression = require("compression")
const helmet = require("helmet")
const app = express()
const route = require("../src/Routes")

const cookiePaser = require("cookie-parser")

const notFound = require("../utils/notFound")
const handleApplicationErrors = require("../utils/errors")


app.use(cors())
app.use(compression())
app.use(helmet())
app.use(cookiePaser(process.env.JWT_SECRET))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
route(app)

app.use(notFound)
app.use(handleApplicationErrors)



module.exports = app
