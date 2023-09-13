import { HTTP_CODE } from 'src/constants/enums'

interface ExceptionOpt{
  cause?: Error
}

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
 
  response: string
  status: number
  private readonly options?: ExceptionOpt
  cause: any

  constructor ( response: string, status: number, options?: ExceptionOpt ) {
    super()
    this.response = response
    this.status = status
    this.options = options
    this.initCause()
  }

  initCause () {
    if ( this.options?.cause ) {
      this.cause = this.options.cause
    }
  }
}

export class UnauthorizedException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Unauthorized Exception', HTTP_CODE.UNAUTHORIZED )
  }
}
export class BadRequestException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Bad Request Exception', HTTP_CODE.BAD_REQUEST )
  }
}

export class NotFoundException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', HTTP_CODE.NOT_FOUND )
  }
}

export class ForbiddenException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', HTTP_CODE.FORBIDDEN )
  }
}
export class NotAcceptableException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', HTTP_CODE.NOT_ACCEPTABLE )
  }
}

export class RequestTimeoutException extends HttpException {
  constructor ( message?: string ) {
    super( message ?? 'Not Found Exception', HTTP_CODE.REQUEST_TIMEOUT )
  }
}
