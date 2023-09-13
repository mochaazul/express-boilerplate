import { HTTP_CODE } from 'src/constants/enums'
import logger from '../utils/logger'

interface HttpExceptionOptions {
  stack?: string
  http_code?: number
  enable_logging?: boolean
}
interface HttpExceptionsProperties {
  message?: string
  options?: HttpExceptionOptions
  http_code: number
}

export class HttpException extends Error implements HttpExceptionsProperties {
  message: string
  name: string
  options?: HttpExceptionOptions | undefined
  http_code: number
  stack?: string | undefined

  constructor ( message: string, http_code: number, options?: HttpExceptionOptions ) {
    super( message )
    Object.setPrototypeOf( this, new.target.prototype )
    this.message = message
    this.options = options ?? {}
    this.http_code = http_code
    this.initStack()
    this.initLogging()
    Error.captureStackTrace( this )
  }

  private initStack () {
    if ( this.options?.stack ) {
      this.stack = this.options.stack
    }
  }
  
  private initLogging () {
    logger.error( this )
  }
}

export class UnauthorizedException extends HttpException {
  constructor ( message: string = 'Unauthorized Exception' ) {
    super( message, HTTP_CODE.UNAUTHORIZED )
  }
}
export class BadRequestException extends HttpException {
  constructor ( message: string = 'Bad Request Exception' ) {
    super( message, HTTP_CODE.BAD_REQUEST )
  }
}

export class NotFoundException extends HttpException {
  constructor ( message: string = 'Not Found Exception' ) {
    super( message, HTTP_CODE.NOT_FOUND )
  }
}

export class ForbiddenException extends HttpException {
  constructor ( message: string = 'Forbidden Exception' ) {
    super( message, HTTP_CODE.FORBIDDEN )
  }
}
export class NotAcceptableException extends HttpException {
  constructor ( message: string = 'Not Acceptable Exception' ) {
    super( message, HTTP_CODE.NOT_ACCEPTABLE )
  }
}

export class RequestTimeoutException extends HttpException {
  constructor ( message: string = 'Request Timeout Exception' ) {
    super( message, HTTP_CODE.REQUEST_TIMEOUT )
  }
}
export class ConflictException extends HttpException {
  constructor ( message: string = 'Conflict Exception' ) {
    super( message, HTTP_CODE.CONFLICT )
  }
}
export class GoneException extends HttpException {
  constructor ( message: string = 'Gone Exception' ) {
    super( message, HTTP_CODE.GONE )
  }
}
export class HttpVersionNotSupportedException extends HttpException {
  constructor ( message: string = 'Http Version not supported exception' ) {
    super( message, HTTP_CODE.VERSION_NOT_SUPPORTED )
  }
}
export class PayloadTooLargeException extends HttpException {
  constructor ( message: string = 'Payload Too Large Exception' ) {
    super( message, HTTP_CODE.PAYLOAD_TOO_LARGE )
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor ( message: string = 'Unsupported media type Exception' ) {
    super( message, HTTP_CODE.UNSUPPORTED_MEDIA_TYPE )
  }
}
export class InternalServerException extends HttpException {
  constructor ( message: string = 'Internal Server Exception' ) {
    super( message, HTTP_CODE.INTERNAL_SERVER_ERROR )
  }
}
export class NotImplementedException extends HttpException {
  constructor ( message: string = 'Unsupported media type Exception' ) {
    super( message, HTTP_CODE.UNSUPPORTED_MEDIA_TYPE )
  }
}
export class MethodNotAllowedException extends HttpException {
  constructor ( message: string = 'Method not allowed Exception' ) {
    super( message, HTTP_CODE.METHOD_NOT_ALLOWED )
  }
}
export class BadGatewayException extends HttpException {
  constructor ( message: string = 'Bad Gateway Exception' ) {
    super( message, HTTP_CODE.BAD_GATEWAY )
  }
}
export class ServiceUnavailableException extends HttpException {
  constructor ( message: string = 'Service unavailable Exception' ) {
    super( message, HTTP_CODE.SERVICE_UNAVAILABLE )
  }
}
export class GatewayTimeoutException extends HttpException {
  constructor ( message: string = 'Gateway timeout Exception' ) {
    super( message, HTTP_CODE.GATEWAY_TIMEOUT )
  }
}
