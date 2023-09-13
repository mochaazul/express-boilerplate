import express from 'express'
import { ValidateError } from 'tsoa'
import { HttpException } from '../exceptions/http'
import { ErrorResponse } from '../dto/ErrorResponse.dto'
import { TypeORMError } from 'typeorm'
import { HTTP_CODE } from 'src/constants/enums'
import logger from '../utils/logger'
export default function ErrorHandler ( err: unknown, req: express.Request, res: express.Response, next: express.NextFunction ) {
  if ( err instanceof ValidateError ) {
    // console.error( `Caught Validation Error for ${req.path}:`, err.fields )
    const error = new Error()
    return res.status( 422 ).send( error.message )
  }
  if ( err instanceof HttpException ) {
    return res.status( err.http_code ).send( new ErrorResponse( err.message, err.http_code, err ) )
  }
  if ( err instanceof TypeORMError ) {
    return res.status( HTTP_CODE.INTERNAL_SERVER_ERROR ).send( new ErrorResponse( err.message, HTTP_CODE.INTERNAL_SERVER_ERROR, err ) )
  }
  if ( err instanceof Error ) {
    logger.error( { type: 'Unhandled Exception', stack: err.stack } )
    return res.status( 500 ).send( new ErrorResponse( 'Unhandled Exception', HTTP_CODE.INTERNAL_SERVER_ERROR, err ) )
  }
  next()
}
