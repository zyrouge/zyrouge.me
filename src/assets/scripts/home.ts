import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const animateHero = () => {
    gsap.to("#hero #hero-text", {
        opacity: 0.5,
        scale: 0.99,
        duration: 0.3,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            toggleActions: "play reverse play reverse",
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
        scale: 0.99,
        duration: 0.3,
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            toggleActions: "play reverse play reverse",
            onEnter: () => particleRotation.timeScale(0.75),
            onLeave: () => particleRotation.timeScale(1),
            onEnterBack: () => particleRotation.timeScale(0.75),
            onLeaveBack: () => particleRotation.timeScale(1),
        },
    });
};

const animateProjects = () => {
    const projectItemElements = document.querySelectorAll("#project-item");
    for (const projectItemElement of projectItemElements) {
        const spacerElement = projectItemElement.querySelector(
            "#project-item-spacer",
        )!;
        const logoElement =
            projectItemElement.querySelector("#project-item-logo")!;
        const descriptionElement = projectItemElement.querySelector(
            "#project-item-description",
        )!;
        const linkElementContainer = projectItemElement.querySelector(
            "#project-item-link-container",
        )!;
        const tagsElementContainer = projectItemElement.querySelector(
            "#project-item-tags-container",
        )!;
        const timeline = gsap.timeline({
            defaults: {
                duration: 0.3,
            },
            scrollTrigger: {
                trigger: projectItemElement,
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
            { scale: 1, translateY: 0 },
            "start",
        );
        timeline.fromTo(
            descriptionElement,
            {
                scale: 1.05,
                opacity: 0,
                translateY: descriptionElement.clientHeight,
            },
            { scale: 1, opacity: 1, translateY: 0, delay: 0.1 },
            "start",
        );
        timeline.fromTo(
            linkElementContainer,
            {
                scale: 1.05,
                opacity: 0,
                translateY: linkElementContainer.clientHeight,
            },
            { scale: 1, opacity: 1, translateY: 0 },
        );
        timeline.fromTo(
            tagsElementContainer,
            {
                scale: 1.05,
                opacity: 0,
                translateY: tagsElementContainer.clientHeight,
            },
            { scale: 1, opacity: 1, translateY: 0 },
        );
        timeline.add(() => {}, "+=0.5");
    }
};

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    animateHero();
    animateProjects();
});

export {};
