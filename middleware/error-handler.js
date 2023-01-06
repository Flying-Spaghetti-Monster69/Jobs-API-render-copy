const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'something went wrong try again later'
  }

  if (err.name === 'ValidationError') {
    CustomError.msg = Object.values(err.errors).map((item)=>item.message).join(', ')
    CustomError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.code && err.code === 11000){
    CustomError.msg = `duplicate value entered for ${Object.keys(err.keyValue)} field, please enter another value`
    CustomError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'CastError') {
    CustomError.msg = `no item found with id: ${err.value}`
    CustomError.statusCode = StatusCodes.NOT_FOUND
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statusCode).json({msg:CustomError.msg})
}

module.exports = errorHandlerMiddleware
