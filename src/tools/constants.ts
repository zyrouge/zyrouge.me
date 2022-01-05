export class ElementId {
    constructor(public readonly name: string, public readonly value: string) {}

    scroll() {
        Constants.scrollToId(this.value);
    }

    static def(name: string, id: string) {
        return new ElementId(name, id);
    }

    static id(id: string) {
        return new ElementId(id, id);
    }
}

export class Constants {
    static ids = {
        startContent: ElementId.id("start-content"),
        sections: {
            skills: ElementId.def("Skills", "skills"),
            projects: ElementId.def("Projects", "projects"),
        },
    };

    static scrollToId(
        id: string,
        behaviour: NonNullable<ScrollIntoViewOptions["behavior"]> = "smooth"
    ) {
        document.getElementById(id)?.scrollIntoView({
            behavior: behaviour,
        });
    }
}
