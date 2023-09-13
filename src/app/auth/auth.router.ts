import {
  Body, Post, Route, Tags
} from 'tsoa'
import { LoginRequestParameter, RegisterRequestParameter } from './auth.interface'
import { loginService, registerUserService } from './auth.service'

@Tags( 'Authorization' )
@Route( '/api/auth' )
export class AuthController {
  @Post( '/login' )
  public async login ( @Body() payload: LoginRequestParameter ) {
    try {
      if ( !payload.noInduk || !payload.password ) {
        throw new Error( 'wow' )
      }
      return await loginService( payload )
    } catch ( error ) {
      return error
    }
  }

  @Post( '/register' )
  public async register ( @Body() payload: RegisterRequestParameter ) {
    try {
      if ( !payload.noInduk || !payload.password || !payload.name ) {
        throw new Error( 'wow' )
      }
      return await registerUserService( payload )
    } catch ( error ) {
      return error
    }
  }
}
