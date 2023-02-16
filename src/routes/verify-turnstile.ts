import getFormattedDate from '../util/getDate'

// Set endpoint and Turnstiles Site Secret
const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = process.env.TURNSTILE_SECRET
    ? `${process.env.TURNSTILE_SECRET}`
    : '1x0000000000000000000000000000000AA'

export default async function verifyTurnstile(req: {
    body: { token: string }
}) {
    // Format request body
    const body = `secret=${encodeURIComponent(
        secret,
    )}&response=${encodeURIComponent(req.body.token)}`

    // Post the request body to cloudflare turnstiles
    const result = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    }).then((result) => {
        console.log(getFormattedDate() + ' The server responded to a request at /verify-turnstile', result)

        if (secret === '1x0000000000000000000000000000000AA') {
            console.log(getFormattedDate() + ' This request will immediately response good due to the secret being set to a development secret!')
        }

        // If we add a .then() statement, the fetch function will return void. However, if we return the result of the Promise, then
        // the function will return a promise again, which is why we're "double returning"
        return result
    })

    // Return the result json
    return await result.json()
}
