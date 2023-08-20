const attachHero = () => {
    const heroElement = document.getElementById("hero")!;
    const heroTextElements = [
        ...document.querySelectorAll<HTMLElement>("#hero-text"),
    ];
    const heroParticleElements = [
        ...document.querySelectorAll<HTMLElement>("#hero-particle"),
    ];
    heroElement.addEventListener("mouseenter", () => {
        heroTextElements.forEach((x) => {
            const index = parseInt(x.getAttribute("data-index")!);
            x.style.transitionDelay = `${0.2 * index}s`;
            x.setAttribute("data-visible", "true");
        });
        heroParticleElements.forEach((x) => {
            x.setAttribute("data-visible", "true");
        });
    });
    heroElement.addEventListener("mouseleave", () => {
        heroTextElements.forEach((x) => {
            x.style.transitionDelay = "0s";
            x.setAttribute("data-visible", "");
        });
        heroParticleElements.forEach((x) => {
            x.setAttribute("data-visible", "");
        });
    });
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
