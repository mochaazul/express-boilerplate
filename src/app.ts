import express, { Express } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from '../tsoa/routes'
import Database from '@database'
import ErrorHandler from './common/middleware/error'

const app: Express = express()

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/
export const db = new Database()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.on( 'ready', async () => {
  if ( process.env.NODE_ENV === 'test' ) {
    await db.connectToDBTest()
  }
  if ( process.env.NODE_ENV === 'development' ) {
    await db.connectToDB()
  }
} )

app.set( 'json spaces', 2 )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

// Handle logs in console during development
if ( process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development' ) {
  app.use( morgan( 'dev' ) )
  app.use( cors() )
}

// Handle security and origin in production
if ( process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'production' ) {
  app.use( helmet() )
}

app.get( '/ping', ( req, res ) => {
  res.send( { msg: 'pong' } ).status( 200 )
} )
/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

RegisterRoutes( app )

app.use( '/docs', swaggerUi.serve, async ( req: express.Request, res: express.Response ) => {
  return res.send( swaggerUi.generateHTML( await import( '../tsoa/swagger.json' ) ) )
} )

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

app.use( ErrorHandler )

app.emit( 'ready' )
app.use( function notFoundHandler ( _req, res: express.Response ) {
  return res.status( 404 ).send( { message: 'Not Found' } )
} )

export default app
