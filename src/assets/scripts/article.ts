interface ArticleHeading {
    id: string;
    toc: HTMLElement;
    content: HTMLElement;
}

class ArticleState {
    headingIdAttribute = "data-hid";
    activeAttribute = "data-active";
    tocHeadingSelector = "#headings li";

    currentHeading: ArticleHeading | null = null;
    headings: Record<string, ArticleHeading> = {};
    onScrollEndListeners: (() => void)[] = [];

    initialize() {
        this.headings = this.getAllHeadings();
        this.attachClickHandlers();
        this.attachScrollHander();
        this.attachOnLoadedHandler();
    }

    initializeHeading() {
        const hashHeading = this.headings[location.hash.substring(1)];
        if (hashHeading) {
            this.highlightTocHeading(hashHeading);
            this.highlightContentHeading(hashHeading);
            return;
        }
        const defaultHeadingId = Object.keys(this.headings)[0];
        if (!defaultHeadingId) return;
        const defaultHeading = this.headings[defaultHeadingId]!!;
        this.highlightTocHeading(defaultHeading);
    }

    highlightTocHeading(heading: ArticleHeading) {
        Object.values(this.headings).forEach((x) => {
            x.toc.removeAttribute(this.activeAttribute);
        });
        heading.toc.setAttribute(this.activeAttribute, "");
    }

    highlightContentHeading(heading: ArticleHeading) {
        Object.values(this.headings).forEach((x) => {
            x.content.removeAttribute(this.activeAttribute);
        });
        heading.content.setAttribute(this.activeAttribute, "");
    }

    highlightHeading(heading: ArticleHeading) {
        this.highlightTocHeading(heading);
        this.highlightContentHeading(heading);
    }

    async updateCurrentHeading(heading: ArticleHeading) {
        if (this.currentHeading?.id === heading.id) return;
        this.highlightContentHeading(heading);
        heading.content.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${heading.id}`);
        this.currentHeading = heading;
        await this.waitForScroll();
        this.highlightTocHeading(heading);
    }

    attachClickHandlers() {
        Object.values(this.headings).forEach((x) => {
            const onClick = () => this.updateCurrentHeading(x);
            x.toc.addEventListener("click", onClick);
            x.content.addEventListener("click", onClick);
        });
    }

    attachScrollHander() {
        let onScrollEndInterval: ReturnType<typeof setTimeout> | null = null;
        document.addEventListener("scroll", () => {
            clearInterval(onScrollEndInterval ?? undefined);
            const scrollingElement = document.scrollingElement;
            if (scrollingElement) {
                let visibleHeading = this.currentHeading;
                for (const x of Object.values(this.headings)) {
                    if (scrollingElement.scrollTop < x.content.offsetTop) {
                        break;
                    }
                    visibleHeading = x;
                }
                if (!visibleHeading) return;
                this.highlightTocHeading(visibleHeading);
            }
            onScrollEndInterval = setTimeout(() => this.emitOnScrollEnd(), 50);
        });
    }

    attachOnLoadedHandler() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initializeHeading();
        });
    }

    emitOnScrollEnd() {
        const listeners = this.onScrollEndListeners;
        this.onScrollEndListeners = [];
        listeners.forEach((x) => x());
    }

    waitForScroll() {
        return new Promise<void>((resolve) => {
            this.onScrollEndListeners.push(() => {
                resolve();
            });
        });
    }

    getHeading(id: string) {
        const toc = document.querySelector<HTMLElement>(
            `[${this.headingIdAttribute}="${id}"]`
        )!!;
        const content = document.getElementById(id)!!;
        return { id, toc, content } satisfies ArticleHeading;
    }

    getAllHeadings() {
        const headings: Record<string, ArticleHeading> = {};
        document.querySelectorAll(this.tocHeadingSelector).forEach((x) => {
            const id = x.getAttribute(this.headingIdAttribute);
            if (!id) return;
            headings[id] = this.getHeading(id);
        });
        return headings;
    }
}

const articleState = new ArticleState();
articleState.initialize();

export {};
