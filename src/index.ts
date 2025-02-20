import http from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'
import i18n from './i18n'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import AuthRouter from './routes/auth'
import UserRouter from './routes/users'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * i18n uses Accept-Language header for localization of response messages.
 */
app.use(i18n.init)

// routes
app.use('/auth', AuthRouter())
app.use('/', UserRouter())
app.use('/', ProgramRouter())
app.use('/', ExerciseRouter())

const httpServer = http.createServer(app)

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
