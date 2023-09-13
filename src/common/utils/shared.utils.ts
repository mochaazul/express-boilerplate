export const isFunction = ( val: any ) => typeof val === 'function'
export const isString = ( val: any ) => typeof val === 'string'
export const isNumber = ( val: any ) => typeof val === 'number'
export const isConstructor = ( val: any ) => val === 'constructor'
export const isNil = ( val: any ) => ( 0, exports.isUndefined )( val ) || val === null
export const isEmpty = ( array: any | any[] ) => !( array && array.length > 0 )
export const isSymbol = ( val: any ) => typeof val === 'symbol'
export const isUndefined = ( obj: any ) => typeof obj === 'undefined'
export const isObject = ( fn: any ) => !( 0, exports.isNil )( fn ) && typeof fn === 'object'
export const isPlainObject = ( fn: any ) => {
  if ( !( 0, exports.isObject )( fn ) ) {
    return false
  }
  const proto = Object.getPrototypeOf( fn )
  if ( proto === null ) {
    return true
  }
  const ctor = Object.prototype.hasOwnProperty.call( proto, 'constructor' ) &&
        proto.constructor
  return ( typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call( ctor ) ===
            Function.prototype.toString.call( Object ) )
}
