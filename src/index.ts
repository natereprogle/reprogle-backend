import express from 'express'
import cors from 'cors'
import routes from './routes/routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
// import https from 'https'

const app = express()
const PORT = process.env.API_PORT ? process.env.API_PORT : 8080

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100, // Allow a max of 100 requests within that hour window
    standardHeaders: true,
    legacyHeaders: false,
    message:
        'Too many requests from this IP address, please try again in an hour',
})

app.enable('trust proxy')
app.disable('x-powered-by')

app.use(
    cors({
        origin: 'https://reprogle.org',
        methods: 'POST',
    }),
    express.json(),
    routes,
    limiter,
    helmet(),
)

app.get('/ip', (req, res) => res.send(req.ip))

// https.createServer({}, app).listen(PORT)
app.listen(PORT, () => console.log(`API running on port ${PORT}`))
