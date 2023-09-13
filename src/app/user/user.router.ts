import {
  Body, Controller, Delete, Get, Post, Put, Query, Route, Security, Tags
} from 'tsoa'
import {
  getAllUserService, createUserService, updateUserService, deleteUserService
} from './user.service'
import { SuccessResponse } from 'src/common/dto/SuccessResponse.dto'

@Tags( 'User' )
@Route( '/api/user' )
export class User extends Controller {
  @Get( '/' )
  public async getAllUser () {
    const data = await getAllUserService()
    return new SuccessResponse( data )
  }

  @Post( '/create/' )
  @Security( 'api_key', ['create:user'] )
  public async createUser ( @Body() body: { email: string, roles: string[] } ) {
    return await createUserService( { email: body.email, roles: body.roles } )
  }

  @Put( '/update/{id}/' )
  @Security( 'api_key', ['update:user'] )
  public async updateUser ( @Query( 'id' ) id: string, @Body() body: { email: string, roles: string[] } ) {
    return await updateUserService( {
      id: Number( id ), email: body.email, roles: body.roles
    } )
  }

  @Delete( '/delete/{id}/' )
  @Security( 'api_key', ['delete:user'] )
  public async deleteUser ( @Query( 'id' ) id: string ) {
    return await deleteUserService( { id: Number( id ) } )
  }
}
