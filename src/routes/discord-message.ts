import { APIResponse } from '../types/types'

const endpoint = process.env.WEBHOOK ? `${process.env.WEBHOOK}` : undefined

export default function sendMessageToDiscord(
    firstName: string,
    lastName: string,
    email: string,
    message: string,
): APIResponse {
    if (!endpoint) {
        return {
            code: 500,
            message: JSON.stringify({
                message: 'Something went wrong, we are working on it!',
            }),
            debug: 'Webhook environment variable not set!',
        }
    }

    const contents = {
        content: 'A new form has been submitted from reprogle.org',
        embeds: [
            {
                type: 'rich',
                color: 0x0d1260,
                title: `From ${firstName} ${lastName}`,
                description: message,
                footer: {
                    text: `Reply to ${email}`,
                },
            },
        ],
    }

    fetch(`${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(contents),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() =>
        console.log('API responded to a request at /discord\n', {
            firstName,
            lastName,
            email,
            message,
        }),
    )

    return {
        code: 200,
        message: JSON.stringify(contents),
    }
}
