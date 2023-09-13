import winston, { format } from 'winston'

const {
  combine, timestamp, prettyPrint, colorize, errors
} = format

const logger = winston.createLogger( {
  level : 'error',
  format: combine(
    errors( { stack: true } ),
    colorize(),
    timestamp(),
    prettyPrint()
    // json()
  ),
  transports: [
    new winston.transports.File( { filename: 'log/error.log', level: 'error' } ),
    new winston.transports.File( { filename: 'log/info.log', level: 'info' } ),
    new winston.transports.File( { filename: 'log/debug.log', level: 'debug' } ),
    new winston.transports.File( { filename: 'log/warn.log', level: 'warn' } ),
    new winston.transports.File( { filename: 'log/combined.log' }
    )
  ]
} )

if ( process.env.NODE_ENV !== 'production' ) {
  logger.add( new winston.transports.Console( { format: winston.format.simple() } ) )
}
export default logger
