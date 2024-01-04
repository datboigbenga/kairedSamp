const Joi = require("joi")

class validateUser{
    validateUserSignUp = (requestData) => {
    const schema = Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirm_password: Joi.ref("password")
    }).with('password', "confirm_password");

    const isValidateResult = schema.validate(requestData)
    if (isValidateResult?.error) {
        return { success: false, msg: isValidateResult.error?.message }
    } else {
      return { success: true }
    }
}

    validateUserSignIn = (requestData)=>{
        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        })
    
        const isValidateResult = schema.validate(requestData)
        if (isValidateResult?.error) {
            return { success: false, msg: isValidateResult.error?.message }
        } else {
          return { success: true }
        }
    }

    validateUserForgotpassword = (requestData)=>{
        const schema = Joi.object().keys({
            email: Joi.string().required().email()
        })
    
        const isValidateResult = schema.validate(requestData)
        if (isValidateResult?.error) {
            return { success: false, msg: isValidateResult.error?.message }
        } else {
          return { success: true }
        }
    }

    validateUserResetpassword = (requestData)=>{
        const schema = Joi.object().keys({
            newPassword: Joi.string().required(),
            confirmNewPassword: Joi.ref("newPassword"),
        }).with('newPassword', "confirmNewPassword")
    
        const isValidateResult = schema.validate(requestData)
        if (isValidateResult?.error) {
            return { success: false, msg: isValidateResult.error?.message }
        } else {
          return { success: true }
        }
    }
}

module.exports = new validateUser()