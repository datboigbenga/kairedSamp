const userRoute = require("express").Router()
const UserController = require("./user.controller")
const {auth} = require("../../authMiddleware/auth")

const { 
 createUser,
 resendPin,
 loginUser,
 verifyEmail,
 resetPassword,
 logOut,
 forgotPassword

} = UserController

userRoute.route("/")
  .post(createUser)

userRoute.route("/resendPin")
  .post(auth, resendPin)

userRoute.route("/login")
  .post(loginUser)

userRoute.route("/verifyEmail")
  .post(auth, verifyEmail)

userRoute.route("/resetPassword")
  .post(auth, resetPassword)

userRoute.route("/logout")
  .delete(auth, logOut)

userRoute.route("/forgotPassword")
  .post(forgotPassword)

// customerRoute.get('/name', getAllCustomersByName)
// customerRoute.get('/:id', getCustomerById)

module.exports = userRoute