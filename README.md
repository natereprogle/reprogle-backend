## Reprogle.org Backend
This project is meant to be a middleman for my [website](https://reprogle.org) ([source here](https://github.com/TerrrorByte/reprogle.org)).
My site used to run on Next.js, which meant that it could use things like process.env. Now that it uses Angular it
cannot access process.env, since Angular is a client-side only development framework. Angular apps are first compiled into
plain JavaScript and then those files are distributed to a webserver. This means that any client secrets you need to include in the app are
visible in the code.

The best way to handle this is to use a middleman or your own backend to handle these requests. This API
serves as the middleman for the site to hide secrets. The main reason I did this was to prevent abusing my Discord Webhook I use for
my contact form since, prior to this, the webhook was available in plaintext in the client app.

A `Dockerfile` and `docker-compose.example.yml` if you want to build from source yourself.

### Building and running
I mean...I guess you can run this, but it's meant specifically for me haha. Have at it!
1. Clone the repo and run `npm install`. This will install all dependencies. Don't need dev dependencies? Run `npm install --production`
2. Create a `/certs` folder in the root directory and place your fullchain.pem and privkey.pem files in there. This will ensure the API is using SSL.
   * Without those files, it _will_ fail to start!
3. Run `npm start`. Make sure the proper environment variables are set. Those are:
   * `API_HOST` (Defaults to 0.0.0.0 if not provided)
   * `WEBHOOK` (Used for sending Discord to your Discord channel/server)
   * `TURNSTILE_SECRET` (Used for verifying turnstile secrets)