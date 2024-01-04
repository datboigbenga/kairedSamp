const Joi = require("joi")

class validateProfile{
    validateUserProfileInput = (requestData) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().required().min(2),
        lastName: Joi.string().required().min(2),
        phoneNo: Joi.string().required().min(2),
        interests: Joi.array(),
        nationalty: Joi.string().required().min(2),
        city: Joi.string().required().min(2),
        avatar:Joi.string(),
    })

    const isValidateResult = schema.validate(requestData)
    if (isValidateResult?.error) {
        return { success: false, msg: isValidateResult.error?.message }
    } else {
      return { success: true }
    }
}

}

module.exports = new validateProfile()