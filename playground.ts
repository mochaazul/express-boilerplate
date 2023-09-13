enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}

enum HTTP_ERR {
  OK = 'OK',
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  NO_CONTENT = 'NO_CONTENT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_ACCEPTABLE = 'NOT_ACCEPTABLE',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT'
}

interface ExceptionOpt{
  cause?: Error
}

type ExceptionsTypes =
UnauthorizedException |
BadRequestException |
NotAcceptableException |
NotFoundException |
ForbiddenException |
RequestTimeoutException

export class HttpException extends Error {
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * throw new HttpException()
   * throw new HttpException('message', HttpStatus.BAD_REQUEST)
   * throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
   *  cause: new Error('Cause Error'),
   * })
   *
   *
   * @usageNotes
   * The constructor arguments define the response and the HTTP response status code.
   * - The `response` argument (required) defines the JSON response body. alternatively, it can also be
   *  an error object that is used to define an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
   * - The `status` argument (required) defines the HTTP Status Code.
   * - The `options` argument (optional) defines additional error options. Currently, it supports the `cause` attribute,
   *  and can be used as an alternative way to specify the error cause: `const error = new HttpException('description', 400, { cause: new Error() });`
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: the Http Status Code.
   * - `message`: a short description of the HTTP error by default; override this
   * by supplying a string in the `response` parameter.
   *
   * To override the entire JSON response body, pass an object to the `createBody`
   * method. Nest will serialize the object and return it as the JSON response body.
   *
   * The `status` argument is required, and should be a valid HTTP status code.
   * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
   *
   * @param response string, object describing the error condition or the error cause.
   * @param status HTTP response status code.
   * @param options An object used to add an error cause.
  */
 
  message: string
  errCode: string | number
  private readonly options?: ExceptionOpt
  cause: any

  constructor ( response: string, err_code: string | number, http_code?: number, options?: ExceptionOpt ) {
    super()
    this.message = response
    this.errCode = err_code
    this.options = options
    this.initCause()
  }

  initCause () {
    if ( this.options?.cause ) {
      this.cause = this.options.cause
    }
  }

  chrome
}

export class UnauthorizedException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Unauthorized Exception', 'UNAUTHORIZED' )
  }
}
export class BadRequestException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Bad Request Exception', 'BAD_REQUEST' )
  }
}

export class NotFoundException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', 'NOT_FOUND' )
  }
}

export class ForbiddenException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', 'FORBIDDEN' )
  }
}
export class NotAcceptableException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Acceptable Exception', 'NOT_ACCEPTABLE' )
  }
}

export class RequestTimeoutException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', 'REQUEST_TIMEOUT' )
  }
}

const test = new UnauthorizedException( 'Not authorized soalnya bego' )

export class GenericResponse {
  stat_msg: string
  stat_code: string | number
}

export class ErrorResponse extends GenericResponse {
  stack?: string
  http_code: number
  constructor ( msg: string | ExceptionsTypes, stat_code?: string, http_code?: number ) {
    super()
    if ( msg instanceof Error ) {
      this.stat_msg = msg.message
      this.stat_code = msg.errCode
      this.stack = msg.stack
      console.log( 'ini error instancenya' )
    } else {
      this.stat_msg = msg
      this.stat_code = stat_code ?? ''
      this.http_code = http_code ?? 500
    }
  }
}

console.error( new ErrorResponse( test ) )
