export class Utils {
    static BREAKPOINT_MD = 768;

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
            (x) => `<b>${x.slice(2, -2)}</b>`,
        );
        return styled;
    }

    static getHtmlSafeId(content: string) {
        return content.toLowerCase().replaceAll(/[^\w\d]/g, "-");
    }

    static extractAstroId(element: HTMLElement) {
        const prefix = "data-astro-cid-";
        for (const x of element.attributes) {
            if (x.name.startsWith(prefix)) {
                return x.name;
            }
        }
        throw new Error("Unable to find astro content id");
    }
}

export class CancellableTimeout {
    _promiseWithResolvers: PromiseWithResolvers<void> | undefined;
    _timeout: ReturnType<typeof setTimeout> | undefined;
    started = false;
    ended = false;
    cancelled = false;

    constructor(public readonly ms: number) {}

    start() {
        if (this.started) {
            throw new Error("Timeout was already started");
        }
        if (this.ended) {
            throw new Error("Timeout has already ended");
        }
        const promiseWithResolvers = Promise.withResolvers<void>();
        this._promiseWithResolvers = promiseWithResolvers;
        this.started = true;
        this._timeout = setTimeout(() => {
            delete this._timeout;
            delete this._promiseWithResolvers;
            this.ended = true;
            promiseWithResolvers.resolve();
        }, this.ms);
        return this._promiseWithResolvers.promise;
    }

    cancel() {
        if (!this._promiseWithResolvers) {
            throw new Error("Timeout is not active");
        }
        this.ended = true;
        this.cancelled = true;
        clearTimeout(this._timeout);
        this._promiseWithResolvers!.reject(new Error("Timeout interrupted"));
    }
}
