require("dotenv")
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../utils/messages")
const { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, OK, UNAUTHORIZED } = require("../utils/statusCodes")
const {isTokenValid, attachCookiesToresponse} = require("../utils/jwt")
const userService = require("../src/Users/user.service")

const auth = async(req, res, next)=> {
    // const { manageAsyncOps, manageApplicationErrors } = req.context
    const {accessToken, refreshToken} = req.signedCookies
    console.log(refreshToken)

    // console.log(refreshToken)
    // try {
        if(accessToken){
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            // console.log(req.user)
            return next()
        }
        const payload = isTokenValid(refreshToken)
        console.log(payload)
        const [error, existingToken] = await manageAsyncOps(userService.getSingleToken({
            userId: payload.user.id,
            refreshToken: payload.refreshToken
        }))
        console.log(error)
        console.log(existingToken)
        if(!existingToken || !existingToken.token?.isValid)return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_AUTH, statusCode: UNAUTHORIZED }))

        attachCookiesToresponse({res, user:payload.user, refreshToken: existingToken.refreshToken})
        req.user = payload.user
        // console.log(req)
        next();

    // } 
    if(error) return next(manageApplicationErrors({ message: ERROR_MESSAGE.INVALID_AUTH, statusCode: UNAUTHORIZED }))

        console.log(error)
}

const authorizePermissions = (...roles)=>{
     return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            throw new customApiError.unaccessible("unable to access route")
        }
        next();
     }
}
module.exports  = {
    auth,
    authorizePermissions
}
