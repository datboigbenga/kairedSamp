const setupRequestContext = require("../../utils/commons")
const userRoute = require("../Users/user.route")
const profileRoute = require("../Profile/profile.route")


const route = (app) => {
  const baseURL = "/api/v1"
  app.use(setupRequestContext)

  //all routes come below here
  app.use(`${baseURL}/user`, userRoute)
  app.use(`${baseURL}/profile`, profileRoute)

}

module.exports = route
