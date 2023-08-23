interface HeroElements {
    container: HTMLElement;
    enabled: boolean;
    texts: HTMLElement[];
    particles: HTMLElement[];
}

const enableHeroElements = (heroElements: HeroElements) => {
    if (heroElements.enabled) return;
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
    if (!heroElements.enabled) return;
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

const attachProjects = () => {
    const projectItemElements = [
        ...document.querySelectorAll<HTMLElement>("#project-item"),
    ];
    projectItemElements.forEach((x) => {
        x.addEventListener("mouseenter", () => {
            projectItemElements.forEach((y) => {
                y.setAttribute("data-active", x === y ? "true" : "false");
            });
        });
        x.addEventListener("mouseleave", () => {
            projectItemElements.forEach((y) => {
                y.setAttribute("data-active", "");
            });
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    attachHero();
    attachProjects();
});

export {};
