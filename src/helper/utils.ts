Object.defineProperty( exports, '__esModule', { value: true } )
exports.isSymbol = exports.isEmpty = exports.isNil = exports.isConstructor = exports.isNumber = exports.isString = exports.isFunction = exports.stripEndSlash = exports.normalizePath = exports.addLeadingSlash = exports.isPlainObject = exports.isObject = exports.isUndefined = void 0
/* eslint-disable @typescript-eslint/no-use-before-define */
const isUndefined = ( obj: any ) => typeof obj === 'undefined'
exports.isUndefined = isUndefined
const isObject = ( fn: any ) => !( 0, exports.isNil )( fn ) && typeof fn === 'object'
exports.isObject = isObject
const isPlainObject = ( fn: any ) => {
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
exports.isPlainObject = isPlainObject
const addLeadingSlash = ( path: string ) => path && typeof path === 'string'
  ? path.charAt( 0 ) !== '/'
    ? '/' + path
    : path
  : ''
exports.addLeadingSlash = addLeadingSlash
const normalizePath = ( path: string ) => path
  ? path.startsWith( '/' )
    ? ( '/' + path.replace( /\/+$/, '' ) ).replace( /\/+/g, '/' )
    : '/' + path.replace( /\/+$/, '' )
  : '/'
exports.normalizePath = normalizePath
const stripEndSlash = ( path: string | any[] ) => path[path.length - 1] === '/' ? path.slice( 0, path.length - 1 ) : path
exports.stripEndSlash = stripEndSlash
const isFunction = ( val: any ) => typeof val === 'function'
exports.isFunction = isFunction
const isString = ( val: any ) => typeof val === 'string'
exports.isString = isString
const isNumber = ( val: any ) => typeof val === 'number'
exports.isNumber = isNumber
const isConstructor = ( val: string ) => val === 'constructor'
exports.isConstructor = isConstructor
const isNil = ( val: null ) => ( 0, exports.isUndefined )( val ) || val === null
exports.isNil = isNil
const isEmpty = ( array: string | any[] ) => !( array && array.length > 0 )
exports.isEmpty = isEmpty
const isSymbol = ( val: any ) => typeof val === 'symbol'
exports.isSymbol = isSymbol
