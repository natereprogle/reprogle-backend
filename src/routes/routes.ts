// Imports
import express from 'express'
import sendMessageToDiscord from './discord-message'
import verifyTurnstile from './verify-turnstile'

// Configure express router
const router = express.Router()

// Set up routes
router.post('/verify-turnstile', async (req, res) => {
    res.send(await verifyTurnstile(req))
})

router.post('/discord', async (req, res) => {
    const contents = sendMessageToDiscord(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.message,
    )
    // Using a custom return type allows us to send different status codes and messages depending on the result of the sendMessageToDiscord function
    res.status(contents.code).send(JSON.parse(contents.message))
    if (contents.debug) {
        console.warn(contents.debug)
    }
})

router.get('/', (_, res) => {
    res.status(200).send({
        // eslint-disable-next-line quotes
        data: "You've hit the reprogle.org backend. Please redirect to reprogle.org!",
    })
})

// Export the router
export default router
