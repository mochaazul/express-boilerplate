import { Role } from '@entity/role'
import { User } from '@entity/user'
import { scopeFormatter } from 'src/helper/scopeHelper'

export const getAllUserService = async () => {
  const users = await User.find( {
    relations: [
      'role',
      'role.scopes',
      'asd'
    ]
  } )
  const formattedUsers = users.map( user => {
    const scopes = scopeFormatter( user.role.scopes )
    return {
      id     : user.id,
      noInduk: user.noInduk,
      name   : user.name,
      role   : user.role.role,
      scopes
    }
  } )
  return formattedUsers
}

export const createUserService = async ( { email, roles }: { email: string, roles: string[] } ) => {
  try {
    const _newUser = new User()
    _newUser.email = email
    // _newUser.roles = newRoles;
    await _newUser.save()

    await Promise.all( roles.map( async _role => {
      try {
        const _new = new Role()
        _new.role = _role
        _new.user = _newUser
        return await _new.save()
      } catch ( e ) {
        // eslint-disable-next-line no-console
        console.error( e )
      }
    } ) )

    return await User.findOne( {
      where    : { email },
      relations: ['roles']
    } )
  } catch ( e: any ) {
    return new Error( e )
  }
}

export const updateUserService = async ( {
  id, email, roles
}: { id: number, email: string, roles: string[] } ) => {
  try {
    const _updatedUser = await User.findOne( { where: { id }, relations: ['role'] } )
    if ( !_updatedUser ) return { message: 'User is not found!' }
    _updatedUser.email = email
    // await Promise.all(_updatedUser['role']?.map(async (_role) => {
    //   try {
    //     return _role.remove();
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }));
    await _updatedUser.save()

    await Promise.all( roles.map( async _role => {
      try {
        const _new = new Role()
        _new.role = _role
        _new.user = _updatedUser
        return await _new.save()
      } catch ( e ) {
        // eslint-disable-next-line no-console
        console.error( e )
      }
    } ) )

    return await User.findOne( {
      where    : { email },
      relations: ['roles']
    } )
  } catch ( e: any ) {
    return new Error( e )
  }
}

export const deleteUserService = async ( { id }: { id: number } ) => {
  try {
    const foundUser = await User.findOne( { id } )
    return await foundUser?.remove()
  } catch ( e: any ) {
    return new Error( e )
  }
}
