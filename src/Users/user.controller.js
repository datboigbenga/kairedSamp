const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK, UNAUTHORIZED } = require("../../utils/statusCodes")
const validateUser = require("./user.validation")
const userService = require("./user.service")
const { createTokenUser, createJWT, attachCookiesToresponse, } = require("../../utils/jwt")
const validate = require("../../utils/validatePass")
const createHash = require("../../utils/createHash")
const crypto =require("crypto")
const { DATE } = require("sequelize")
const {sendVericationEmail, sendResetPasswordEmail} =  require("../../utils/mailer")

class UserController {
  createUser = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context

    const validation = validateUser.validateUserSignUp(req.body)
    const verificationPin = Math.floor(10000 +Math.random() * 90000);

    if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))

    const body = { ...req.body, verification_Token:verificationPin}

    const [error, response] = await manageAsyncOps(userService.createUser(body))

    if (error?.name === 'SequelizeUniqueConstraintError') return next(manageApplicationErrors({ message: ERROR_MESSAGE.DUPLICATE_USER, statusCode: BAD_REQUEST }))

    if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!response) return next(manageApplicationErrors({ message: ERROR_MESSAGE.CREATE_USER, statusCode: BAD_REQUEST }))
    
    console.log(response.dataValues)
    const tokenUser = createTokenUser(response.dataValues)
    console.log(tokenUser)

    let refreshToken = "";

    const [errorTok, existingToken] = await manageAsyncOps(userService.getSingleToken({userId:response.dataValues.id}))
    console.log(existingToken)
    if(existingToken){
        const {isValid} = existingToken.token;
        if(!isValid) return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_PASSWORD, statusCode: UNAUTHORIZED }))
    
        refreshToken = existingToken.token.refreshToken
        attachCookiesToresponse({res,user:tokenUser, refreshToken:refreshToken})

        res.status(CREATED).json({
          message: SUCCESS_MESSAGE.USER_CREATED,
          statusCode: CREATED
        })
        return;
    }

    
    refreshToken = crypto.randomBytes(40).toString("hex")

    const userAgent = req.headers["user-agent"]
    const ip = req.ip
    const userToken = {refreshToken, ip, userAgent, userId:response.dataValues.id}

    const [errorCreateTok, createToken] = await manageAsyncOps(userService.createTokenUser(userToken))

    attachCookiesToresponse({res,user:tokenUser, refreshToken:refreshToken})

    await sendVericationEmail({
      userName:response.dataValues.userName, 
      email:response.dataValues.email, 
      verificationToken:response.dataValues.verification_Token
  }); 


    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.USER_CREATED,
      statusCode: CREATED
    })

  }


  // ---------------------------------------------------------------------------------------------------------------------

  resendPin = async (req, res, next) => {
    const { manageAsyncOps, manageApplicationErrors } = req.context
    const verificationPin = Math.floor(10000 +Math.random() * 90000);
    const userId = req.user.id

    const [errorUserExist, userExists] = await manageAsyncOps(userService.getSingleUserByParams({id:userId}))
    console.log(errorUserExist)

    if (errorUserExist) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!userExists.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_PROFILE, statusCode: BAD_REQUEST }))

    const [errorUpdate, updatedUser] = await manageAsyncOps(userService.updateVerificationPin({verification_Token:verificationPin}, {id:userId}))
   
    if (errorUpdate) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

    if (!updatedUser.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_PROFILE, statusCode: BAD_REQUEST }))

    await sendVericationEmail({
      userName:req.user.userName, 
      email:req.user.email, 
      verificationToken:updatedUser.verification_Token
  }); 

    res.status(CREATED).json({
      message: SUCCESS_MESSAGE.PIN_RESENT,
      statusCode: OK,
    })
  }

  

  // ---------------------------------------------------------------------------------------------------------------------
    loginUser = async (req, res, next) => {
      const { manageAsyncOps, manageApplicationErrors } = req.context
  
      const validation = validateUser.validateUserSignIn(req.body)
  
      if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))
  
      const {email, password} = req.body

      const [error, response] = await manageAsyncOps(userService.getSingleUserByParams({email:email}))
   
      if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!response.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))
      
      if(response.user.is_Verified === false) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NOT_VERIFIED, statusCode: BAD_REQUEST }))
      
      const isPasswordValid = validate(password, response.user.password)
      const [error1, response1] = await manageAsyncOps(isPasswordValid)
      if (!response1)  return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_PASSWORD, statusCode: BAD_REQUEST }))

      console.log(response.user)

      const tokenUser = createTokenUser(response.user)


      let refreshToken = "";

      const [errorTok, existingToken] = await manageAsyncOps(userService.getSingleToken({userId:response.user.id}))

      if (errorTok) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!existingToken.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))

      console.log(existingToken)
      if(existingToken){
          const {isValid} = existingToken.token;
          if(!isValid) return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_PASSWORD, statusCode: UNAUTHORIZED }))
      
          refreshToken = existingToken.token.refreshToken
          attachCookiesToresponse({res,user:tokenUser, refreshToken:refreshToken})

          res.status(CREATED).json({
            message: SUCCESS_MESSAGE.USER_LOGGED,
            statusCode: OK,
          })
          return;
      }
  
      
      refreshToken = crypto.randomBytes(40).toString("hex")
  
      const userAgent = req.headers["user-agent"]
      const ip = req.ip
      const userToken = {refreshToken, ip, userAgent, userId:response.user.id}
  
      const [errorCreateTok, createToken] = await manageAsyncOps(userService.createTokenUser(userToken))

      console.log(createToken)
      attachCookiesToresponse({res,user:tokenUser, refreshToken:refreshToken})

      res.status(CREATED).json({
        message: SUCCESS_MESSAGE.USER_LOGGED,
        statusCode: OK,
      })
    }



  // ---------------------------------------------------------------------------------------------------------------------
    logOut = async (req, res, next) => {
      const { manageAsyncOps, manageApplicationErrors } = req.context

      const [error, response] = await manageAsyncOps(userService.destroySingleToken({id:req.user.id}))

      if (error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!response.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))
      
      res.cookie("accessToken", "logout", {
          httpOnly:true,
          expires:new Date(Date.now())
      });
  
      res.cookie("refreshToken", "logout", {
          httpOnly:true,
          expires:new Date(Date.now())
      });
      res.status(CREATED).json({
        message: SUCCESS_MESSAGE.USER_LOGGED_OUT,
        statusCode: OK,
      })
    }
    

  // ---------------------------------------------------------------------------------------------------------------------
    verifyEmail = async (req, res, next) => {
      const { manageAsyncOps, manageApplicationErrors } = req.context

      const {verificationPin} = req.body

      const [errorVerify, verifyDetails] = await manageAsyncOps(userService.getUserById({id:req.user.id}))
      console.log(errorVerify)

      if (errorVerify) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!verifyDetails.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))

      if (verificationPin !== verifyDetails.user.verification_Token) return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_AUTH, statusCode: UNAUTHORIZED }))
      
      const verificationDate = Date.now()
      const [errorUpdate, updatedUser] = await manageAsyncOps(userService.updateDetails({is_Verified:true, verification_Date: verificationDate}, {id:verifyDetails.user.id}))
      
      if (errorUpdate) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
   
      if (!updatedUser.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))

      res.status(CREATED).json({
        message: SUCCESS_MESSAGE.USER_VERIFIED,
        statusCode: OK,
      })

    }


  // ---------------------------------------------------------------------------------------------------------------------

    resetPassword = async (req, res, next) => {
      const { manageAsyncOps, manageApplicationErrors } = req.context

      const validation = validateUser.validateUserResetpassword(req.body)
  
      if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))
      
      const {token, email} = req.query

      const {newPassword, confirmNewPassword} = req.body

      const [errorVerify, verifyDetails] = await manageAsyncOps(userService.getSingleUserByParams({email:email}))

      if (errorVerify) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!verifyDetails.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))

    const  currentMoment = new Date()

    if(verifyDetails.success && verifyDetails.user){
     if(verifyDetails.user.passwordToken === createHash(token) && verifyDetails.user.passwordTokenExpirationDate > currentMoment){

      const [errorUpdate, updatedUser] = await manageAsyncOps(userService.updateDetails(
        {
          password: newPassword,
          passwordToken:null,
          passwordTokenExpirationDate:null,
          passwordChangedAt: new Date.now()
        }, 
        {id:verifyDetails.user.id}))
   
      if (errorUpdate) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
  
      if (!updatedUser.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_PROFILE, statusCode: BAD_REQUEST }))
      console.log(updatedUser)
    }
      
  }
      res.status(CREATED).json({
        message: SUCCESS_MESSAGE.USER_LOGGED_OUT,
        statusCode: OK,
      })

    }

// ---------------------------------------------------------------------------------------------------------------------

    forgotPassword = async (req, res, next) => {
      const { manageAsyncOps, manageApplicationErrors } = req.context

      const validation = validateUser.validateUserForgotpassword(req.body)
  
      if (!validation.success) return next(manageApplicationErrors({ message: validation.msg, statusCode: BAD_REQUEST}))

      const {email} = req.body

      const [errorVerify, verifyDetails] = await manageAsyncOps(userService.getSingleUserByParams({email:email}))

      if (errorVerify) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))

      if (!verifyDetails.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_USER, statusCode: BAD_REQUEST }))

      if(verifyDetails.success){
        const passwordToken = crypto.randomBytes(70).toString("hex")
        const fiveMinutes = 60 * 1000 *5
        const passwordTokenExpirationDate = new Date(Date.now() + fiveMinutes)
        const origin = `http://localhost:${process.env.PORT}`

        await sendResetPasswordEmail({
            username:user.userName, 
            email:user.email, 
            passwordToken:passwordToken,
            origin
        })

      
        const [errorUpdate, updatedUser] = await manageAsyncOps(userService.updateDetails({
          passwordToken: passwordToken, 
          passwordTokenExpirationDate:passwordTokenExpirationDate},
           {id:verifyDetails.user.id}))
   
        if (errorUpdate) return next(manageApplicationErrors({ message: ERROR_MESSAGE.APP_ERROR, statusCode: INTERNAL_SERVER_ERROR }))
    
        if (!updatedUser.success) return next(manageApplicationErrors({ message: ERROR_MESSAGE.NO_PROFILE, statusCode: BAD_REQUEST }))
        console.log(updatedUser)

      res.status(CREATED).json({
        message: SUCCESS_MESSAGE.GENERAL,
        statusCode: OK,
      })
  
    }
  }

}

  module.exports = new UserController()

  
