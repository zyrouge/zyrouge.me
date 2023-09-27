document.addEventListener("DOMContentLoaded", () => {
    const url = document.querySelector<HTMLMetaElement>(
        "meta[name='redirect-url']",
    )?.content;
    if (!url) return;
    location.assign(url);
});

export {};
