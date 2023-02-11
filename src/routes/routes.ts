import express from 'express'
import sendMessageToDiscord from './discord-message'
import verifyTurnstile from './verify-turnstile'
const router = express.Router()

router.post('/verify-turnstile', async (req, res) => {
    res.send(await verifyTurnstile(req))
})

router.post('/discord', async (req, res) => {
    const contents = await sendMessageToDiscord(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.message,
    )
    res.status(200).send(contents)
})

router.get('/', (_, res) => {
    res.status(200).send({
        // eslint-disable-next-line quotes
        data: "You've hit the reprogle.org backend. Please redirect to reprogle.org!",
    })
})

export default router
