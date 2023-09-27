document.addEventListener("DOMContentLoaded", () => {
    const url = document.querySelector<HTMLMetaElement>(
        "meta[name='redirect-url']"
    )?.content;
    if (!url) return;
    setTimeout(() => {
        location.assign(url);
    }, 2000);
});

export {};
