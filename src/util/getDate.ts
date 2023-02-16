export default function getFormattedDate(): string {
    return new Date().toLocaleString(undefined, {dateStyle: 'short', timeStyle: 'short'})
}