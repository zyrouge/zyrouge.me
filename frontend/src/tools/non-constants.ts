import { Eventer } from "./utils";

export class RenderTimes {
    static latest = 0;
    static stream = new Eventer<number>();

    static #startedAt?: number;

    static start() {
        RenderTimes.#startedAt = Date.now();
    }

    static stop() {
        if (!RenderTimes.#startedAt) return;

        RenderTimes.latest = Date.now() - RenderTimes.#startedAt;
        RenderTimes.stream.dispatch(RenderTimes.latest);

        RenderTimes.#startedAt = undefined;
    }
}
