const { BadRequestError, CustomError, UnauthenticatedError } = require('./errorInstances')

const handleApplicationErrors = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    const { errors = {}, message, statusCode } = err
    const payload =
      Object.keys(errors)?.length > 0 ? { message, errors } : { message }
    return res.status(statusCode).json(payload)
  } else if (err instanceof BadRequestError) {
    const { errors = {}, message, statusCode } = err
    const payload =
      Object.keys(errors)?.length > 0 ? { message, errors } : { message }
    return res.status(statusCode).json(payload)
  }
  else if (err instanceof UnauthenticatedError) {
    const { errors = {}, message, statusCode } = err
    const payload =
      Object.keys(errors)?.length > 0 ? { message, errors } : { message }
    return res.status(statusCode).json(payload)
  }

  return res
    .status(400)
    .json({ message: "An unexpected error occurred. Try again" })
}

module.exports = handleApplicationErrors
