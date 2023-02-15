// Custom type to enable returning different status codes and contents from the same one-liner
// (See routes.ts /discord route for example)
export type APIResponse = {
    code: number
    message: string
    debug?: string
}
