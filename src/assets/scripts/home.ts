import gsap from "gsap";
import { CancellableTimeout, Utils } from "@/core/utils";
import { ScrollTrigger } from "gsap/all";

const attachHero = () => {
    gsap.fromTo(
        "#hero #hero-text",
        { opacity: 0.5, scale: 0.99 },
        {
            opacity: 1,
            scale: 1,
            delay: 0.2,
            duration: 0.3,
            stagger: 0.2,
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom bottom",
                end: "top top",
                toggleActions: "play reverse play reverse",
            },
        },
    );
    gsap.fromTo(
        "#hero #hero-particle",
        { opacity: 0.5, scale: 0.99 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom bottom",
                end: "top top",
                toggleActions: "play reverse play reverse",
            },
        },
    );
    gsap.to("#hero #hero-particle", {
        rotation: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
    });
};

let onProjectsScrollScrollTimeout: CancellableTimeout | undefined;

const onProjectsScroll = async (
    projectElement: HTMLElement,
    projectItemElements: HTMLElement[],
    scrollingElement: Element,
) => {
    if (document.body.clientWidth < Utils.BREAKPOINT_MD) {
        return;
    }
    onProjectsScrollScrollTimeout?.cancel();
    const timeout = new CancellableTimeout(500);
    onProjectsScrollScrollTimeout = timeout;
    try {
        await timeout.start();
    } catch (err) {}
    if (timeout.cancelled) {
        return;
    }
    onProjectsScrollScrollTimeout = undefined;
    const snapIndexAttribute = "data-snapped-index";
    const snapThreshold = scrollingElement.clientHeight * 0.2;
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

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    attachHero();
    attachProjects();
});

export {};
