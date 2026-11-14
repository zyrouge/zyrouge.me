import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const animateSplash = () => {
    const splashElement = document.querySelector("#splash")! as HTMLElement;
    if (document.documentElement.scrollTop !== 0) {
        splashElement.style.display = "none";
        document.body.classList.remove("overflow-hidden");
        return;
    }
    const titleElement = splashElement.querySelector("#splash-title")!;
    const hiElement = splashElement.querySelector("#splash-hi")!;
    document.body.classList.add("overflow-hidden");
    const timeline = gsap.timeline({
        defaults: {
            duration: 0.3,
        },
        onComplete: () => {
            splashElement.style.display = "none";
            document.body.classList.remove("overflow-hidden");
        },
    });
    timeline.fromTo(
        titleElement,
        {
            scale: 1.25,
            opacity: 0,
            letterSpacing: "1.5rem",
        },
        {
            scale: 1,
            opacity: 1,
            letterSpacing: "0.25rem",
            ease: "power1.out",
            duration: 0.75,
        },
    );
    timeline.to(titleElement, {
        scale: 0.9,
        opacity: 0,
    });
    timeline.fromTo(
        hiElement,
        {
            scale: 1.1,
        },
        {
            scale: 1,
            opacity: 1,
            rotation: -10,
            transformOrigin: "bottom right",
        },
    );
    timeline.to(hiElement, {
        rotation: 10,
        transformOrigin: "bottom right",
    });
    timeline.to(hiElement, {
        rotation: 0,
        transformOrigin: "bottom right",
    });
    timeline.to(splashElement, {
        translateY: "-100%",
        ease: "power1.inOut",
    });
};

const animateHero = () => {
    gsap.to("#hero #hero-text", {
        opacity: 0.5,
        scale: 0.99,
        duration: 0.3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom +25%",
            scrub: true,
        },
    });
    const particleRotation = gsap.to("#hero #hero-particle", {
        rotation: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
    });
    gsap.to("#hero #hero-particle", {
        opacity: 0.75,
        scale: 0.95,
        duration: 0.3,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "center top",
            scrub: true,
            onEnter: () => particleRotation.timeScale(0.75),
            onLeave: () => particleRotation.timeScale(1),
            onEnterBack: () => particleRotation.timeScale(0.75),
            onLeaveBack: () => particleRotation.timeScale(1),
        },
    });
};

const animateTechnologies = () => {
    const technologyItemElements = document.querySelectorAll(
        "#technologies #technology-item",
    )!;
    technologyItemElements.forEach((itemElement) => {
        gsap.fromTo(
            itemElement,
            {
                opacity: 0.25,
                translateY: "2rem",
            },
            {
                opacity: 1,
                translateY: 0,
                duration: 0.3,
                scrollTrigger: {
                    trigger: itemElement,
                    start: "top bottom",
                    end: "bottom +=80%",
                    scrub: true,
                },
            },
        );
    });
};

const animateProjects = () => {
    const projectItemElements = document.querySelectorAll("#project-item");
    projectItemElements.forEach((itemElement) => {
        const spacerElement = itemElement.querySelector(
            "#project-item-spacer",
        )!;
        const logoElement = itemElement.querySelector("#project-item-logo")!;
        const descriptionElement = itemElement.querySelector(
            "#project-item-description",
        )!;
        const linkElementContainer = itemElement.querySelector(
            "#project-item-link-container",
        )!;
        const tagsElementContainer = itemElement.querySelector(
            "#project-item-tags-container",
        )!;
        const timeline = gsap.timeline({
            defaults: {
                duration: 0.3,
            },
            scrollTrigger: {
                trigger: itemElement,
                start: "top top",
                toggleActions: "play reverse play reverse",
                pin: true,
                scrub: true,
            },
        });
        timeline.addLabel("start", 0);
        timeline.fromTo(
            logoElement,
            {
                scale: 1.5,
                translateY:
                    spacerElement.clientHeight +
                    descriptionElement.clientHeight +
                    linkElementContainer.clientHeight +
                    tagsElementContainer.clientHeight,
            },
            {
                scale: 1,
                translateY: 0,
            },
            "start",
        );
        timeline.fromTo(
            descriptionElement,
            {
                scale: 1.05,
                autoAlpha: 0,
                translateY: descriptionElement.clientHeight,
            },
            {
                scale: 1,
                autoAlpha: 1,
                translateY: 0,
                delay: 0.1,
            },
            "start",
        );
        timeline.fromTo(
            linkElementContainer,
            {
                scale: 1.05,
                autoAlpha: 0,
                translateY: linkElementContainer.clientHeight,
            },
            {
                scale: 1,
                autoAlpha: 1,
                translateY: 0,
            },
        );
        timeline.fromTo(
            tagsElementContainer,
            {
                scale: 1.05,
                autoAlpha: 0,
                translateY: tagsElementContainer.clientHeight,
            },
            {
                scale: 1,
                autoAlpha: 1,
                translateY: 0,
            },
        );
        timeline.add(() => {}, "+=0.5");
    });
};

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    animateSplash();
    animateHero();
    animateTechnologies();
    animateProjects();
});

export {};
