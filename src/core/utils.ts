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

    static months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    static prettyDateParse(value: number | string | Date) {
        return Utils.prettyDate(new Date(value));
    }

    static prettyDate(date: Date) {
        return `${
            Utils.months[date.getMonth()]
        }, ${date.getDate()} ${date.getFullYear()}`;
    }

    static renderSimpleMarkdown(content: string) {
        const styled = content.replaceAll(
            /\*\*(.*?)\*\*/g,
            (x) => `<b>${x.slice(2, -2)}</b>`
        );
        return styled;
    }

    static getHtmlSafeId(content: string) {
        return content.toLowerCase().replaceAll(/[^\w\d]/g, "-");
    }
}
