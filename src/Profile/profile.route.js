const profileRoute = require("express").Router()
const ProfileController = require("./profile.controller")
const {auth, authorizePermissions} = require("../../authMiddleware/auth")

const { 
 createUserProfile,
} = ProfileController

profileRoute.route("/")
  .post(auth, createUserProfile)




// customerRoute.get('/name', getAllCustomersByName)
// customerRoute.get('/:id', getCustomerById)

module.exports = profileRoute