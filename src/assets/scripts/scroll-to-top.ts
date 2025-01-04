class ScrollToTop {
    scrollToTopId = "scroll-to-top";
    activeAttribute = "data-active";

    isVisible = false;
    lastScrollTop = 0;

    initialize() {
        this.attachDocumentScroll();
        this.attachScrollToTop();
    }

    attachScrollToTop() {
        const element = document.getElementById(this.scrollToTopId);
        element?.addEventListener("click", () => {
            document.scrollingElement?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    attachDocumentScroll() {
        document.addEventListener("scroll", () => {
            this.onScroll();
        });
    }

    onScroll() {
        const { scrollingElement } = document;
        if (!scrollingElement) {
            return;
        }
        const { clientHeight, scrollTop, scrollHeight } = scrollingElement;
        const clientHeightQuarter = clientHeight * 0.25;
        this.setVisibility(
            scrollTop < this.lastScrollTop &&
                scrollTop > clientHeightQuarter &&
                scrollTop + clientHeight < scrollHeight - clientHeightQuarter,
        );
        this.lastScrollTop = scrollTop;
    }

    setVisibility(visible: boolean) {
        if (this.isVisible === visible) {
            return;
        }
        this.isVisible = visible;
        const element = document.getElementById(this.scrollToTopId);
        element?.setAttribute(this.activeAttribute, visible ? "true" : "");
    }
}

const scrollToTop = new ScrollToTop();
scrollToTop.initialize();

export {};
