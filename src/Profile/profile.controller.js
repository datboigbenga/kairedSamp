const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK } = require("../../utils/statusCodes")
const validateProfile = require("./profile.validation")
const ProfileService = require("./profile.service")
const UserService = require("../Users/user.service")
const {sendVericationEmail} = require("../../utils/mailer")

class ProfileController {
  createUserProfile = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context;
 

    const userId = Number(req.user.id)
    console.log(userId)
    const [_, profileExists] = await manageAsyncOps(ProfileService.getOneProfileByUser({userId:userId}))
   
    if (profileExists) return next(manageApplicationErrors({ message: ERROR_MESSAGE.PROFILE_EXISTS, statusCode: BAD_REQUEST }))

    const validation = validateProfile.validateUserProfileInput(req.body)

    if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))

    const {firstName, lastName, phoneNo, interests, nationalty, city, avatar} = req.body

    // const userId = req.user.id
    console.log(userId)
    const [error, response] = await manageAsyncOps(ProfileService.createUserProfile({
      firstName:firstName,
      lastName:lastName,
      phoneNo:phoneNo,
      interests:interests,
      nationalty:nationalty,
      city:city,
      avatar:avatar,
      userId:req.user.id
    }))

    // if (error?.name === 'SequelizeUniqueConstraintError') return next(manageApplicationErrors({ message: ERROR_MESSAGE.DUPLICATE_USER, statusCode: BAD_REQUEST }))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response) return next(manageApplicationErrors({ message: ERROR_MESSAGE.CREATE_USER, statusCode: BAD_REQUEST }))




    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.PROFILE_CREATED,
      statusCode: CREATED,
    })
  }

}
  module.exports = new ProfileController()