interface HeroElements {
    container: HTMLElement;
    enabled: boolean;
    texts: HTMLElement[];
    particles: HTMLElement[];
}

const enableHeroElements = (heroElements: HeroElements) => {
    if (heroElements.enabled) {
        return;
    }
    heroElements.enabled = true;
    heroElements.texts.forEach((x) => {
        const index = parseInt(x.getAttribute("data-index")!);
        x.style.transitionDelay = `${0.2 * index}s`;
        x.setAttribute("data-visible", "true");
    });
    heroElements.particles.forEach((x) => {
        x.setAttribute("data-visible", "true");
    });
};

const disableHeroElements = (heroElements: HeroElements) => {
    if (!heroElements.enabled) {
        return;
    }
    heroElements.enabled = false;
    heroElements.texts.forEach((x) => {
        x.style.transitionDelay = "0";
        x.setAttribute("data-visible", "");
    });
    heroElements.particles.forEach((x) => {
        x.setAttribute("data-visible", "");
    });
};

const attachHero = () => {
    const heroElements: HeroElements = {
        container: document.getElementById("hero")!,
        enabled: false,
        texts: [...document.querySelectorAll<HTMLElement>("#hero-text")],
        particles: [
            ...document.querySelectorAll<HTMLElement>("#hero-particle"),
        ],
    };
    heroElements.container.addEventListener("mouseenter", () => {
        enableHeroElements(heroElements);
    });
    heroElements.container.addEventListener("mouseleave", () => {
        disableHeroElements(heroElements);
    });
    setTimeout(() => {
        enableHeroElements(heroElements);
    }, 200);
};

const onProjectsScroll = (
    projectElement: HTMLElement,
    projectItemElements: HTMLElement[],
    scrollingElement: Element,
) => {
    const snapIndexAttribute = "data-snapped-index";
    const snapThreshold = scrollingElement.clientHeight * 0.15;
    const { scrollTop } = scrollingElement;
    if (
        scrollTop < projectItemElements[0]!!.offsetTop - snapThreshold ||
        scrollTop >
            projectItemElements[projectItemElements.length - 1]!!.offsetTop +
                snapThreshold
    ) {
        projectElement.removeAttribute(snapIndexAttribute);
        return;
    }
    const snappedIndex = parseInt(
        projectElement.getAttribute(snapIndexAttribute) ?? "-1",
    );
    for (let i = projectItemElements.length - 1; i >= 0; i--) {
        const x = projectItemElements[i]!!;
        if (Math.abs(x.offsetTop - scrollTop) < snapThreshold) {
            if (snappedIndex === i) {
                break;
            }
            scrollingElement.scroll({
                top: x.offsetTop,
                behavior: "smooth",
            });
            projectElement.setAttribute(snapIndexAttribute, `${i}`);
            break;
        }
    }
};

const attachProjects = () => {
    const projectElement = document.getElementById("projects")!;
    const projectItemElements = [
        ...document.querySelectorAll<HTMLElement>("#project-item"),
    ];
    document.addEventListener("scrollend", () => {
        const { scrollingElement } = document;
        if (!scrollingElement) {
            return;
        }
        onProjectsScroll(projectElement, projectItemElements, scrollingElement);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    attachHero();
    attachProjects();
});

export {};
