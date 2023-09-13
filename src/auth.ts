import * as express from 'express'
import { verifyToken } from './helper/jwt'
import { User } from '@entity/user'

export interface RequestWithUser extends express.Request{
  loggedInUser: User
}

export async function expressAuthentication (
  request: RequestWithUser,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  try {
    if ( securityName === 'api_key' ) {
      const headerToken = request.headers.authorization
      let token: string = ''
      if ( ( headerToken != null ) ) {
        token = String( headerToken )
      }
      if ( token.length === 0 ) throw 'No Token Provided'
      const decoded: any = await verifyToken( token )
      if ( decoded instanceof Error ) throw decoded
      const user = await User.findOne( {
        where    : { id: decoded.id },
        relations: ['role', 'role.scopes']
      } )
      if ( user == null ) {
        throw 'User not found'
      }
     
      request.loggedInUser = user
      const userScopes: any = user.role.scopes
      const userScopeKeys = Object.keys( userScopes )
        .filter( key => ![
          'id',
          'created_at',
          'updated_at'
        ].includes( key ) && userScopes[key] === true )
        .map( scope => ( scope.replace( /_/g, ':' ) ) )

      const isScopeValid = scopes?.every( scope => userScopeKeys.includes( scope ) )
      if ( !isScopeValid ) throw 'Not Authorized'
      return await new Promise( ( resolve, reject ) => {
        resolve( decoded )
      } )
    }
  } catch ( error: any ) {
    return await new Promise( ( resolve, reject ) => {
      reject( new Error( error ) )
    } )
  }
}
