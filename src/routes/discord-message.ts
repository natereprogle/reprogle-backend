const endpoint = `${process.env.WEBHOOK}`

export default async function sendMessageToDiscord(
    firstName: string,
    lastName: string,
    email: string,
    message: string,
) {
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
    })

    return contents
}
