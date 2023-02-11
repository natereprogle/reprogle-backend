const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = process.env.TURNSTILE_SECRET
    ? `${process.env.TURNSTILE_SECRET}`
    : '1x0000000000000000000000000000000AA'

export default async function verifyTurnstile(req: {
    body: { token: string }
}) {
    const body = `secret=${encodeURIComponent(
        secret,
    )}&response=${encodeURIComponent(req.body.token)}`

    const result = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })

    return await result.json()
}
