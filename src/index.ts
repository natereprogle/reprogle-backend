// Imports
import express from 'express'
import cors from 'cors'
import routes from './routes/routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import http from 'http'

// Set up the app and port variables
const app = express()
const _HOST = process.env.API_HOST ? `${process.env.API_HOST}` : '0.0.0.0'

// Set up the rate listener
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Allow a max of 100 requests within that hour window
    standardHeaders: true,
    legacyHeaders: false,
    message:
        'Too many requests from this IP address, please try again in an hour',
})

// Change some app settings
app.enable('trust proxy')
app.disable('x-powered-by')

// Request the app to use the following handlers
app.use(
    cors({
        origin: ['https://reprogle.org', 'https://www.reprogle.org'],
        methods: 'POST, GET',
    }),
    express.json(),
    routes,
    limiter,
    helmet(),
)

// Create the server variable, but don't start it yet
const server = http.createServer(app)

//Handle graceful shutdowns
process.on('SIGTERM', () => {
    console.log('\nSIGTERM signal received: closing HTTPS server')
    server.close(() => {
        console.log('HTTPS server closed')
    })
})

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTPS server')
    server.close(() => {
        console.log('HTTPS server closed')
    })
})

// Start the server
console.log(`Starting https server on ${_HOST}:8080`)
server.listen({
    host: _HOST,
    port: 8080,
})
