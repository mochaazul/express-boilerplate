import { HttpException } from '../exceptions/http'
import { GenericResponse } from './GenericResponse.dto'

export class ErrorResponse extends GenericResponse {
  stack?: string
  constructor ( msg: string, http_code?: number, stack?: Error | HttpException ) {
    super()
    this.message = msg
    this.status = http_code
    if ( process.env.NODE_ENV !== 'production' ) {
      this.stack = JSON.stringify( stack?.stack )
    }
  }
}
