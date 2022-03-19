export enum States {
    waiting,
    processing,
    done,
    failed,
}

export class Stated<T> {
    state: States;
    data?: T;
    error: any;

    constructor(options: { state: States; data?: T; error?: any }) {
        this.state = options.state;
        this.data = options.data;
        this.error = options.error;
    }

    static waiting<T>(data?: T) {
        return new Stated<T>({ state: States.waiting, data });
    }

    static processing<T>(data?: T) {
        return new Stated<T>({ state: States.processing, data });
    }

    static done<T>(data?: T) {
        return new Stated<T>({ state: States.done, data });
    }

    static fail<T>(error: any) {
        return new Stated<T>({ state: States.done, error });
    }
}
