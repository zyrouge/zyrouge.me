export class Utils {
    static random(length: number) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=&".split("");
        return Array(length)
            .fill(null)
            .map(() => chars[Math.floor(Math.random() * chars.length)]);
    }

    // Source: https://stackoverflow.com/a/38873788
    static elementIsVisible(element: HTMLElement) {
        return !!(
            element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length
        );
    }
}
