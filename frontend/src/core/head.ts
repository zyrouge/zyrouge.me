export type IHeadMetaAttr = [string, string];

export const setPageMeta = (title: string, description: string) => {
    document.title = title;
    setHeadMeta([
        ["title", title],
        ["og:title", title],
        ["description", description],
        ["og:description", description],
    ]);
};

export const setHeadMeta = (attributes: IHeadMetaAttr[]) => {
    return attributes.map(([name, content]) => {
        const element =
            document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`) ??
            document.createElement("meta");
        element.setAttribute("name", name);
        element.setAttribute("property", name);
        element.setAttribute("content", content);
        if (!element.isConnected) document.head.appendChild(element);
        return element;
    });
};

export const removeHeadMeta = (attributes: IHeadMetaAttr[]) => {
    attributes.forEach(([name]) => {
        document.querySelector(`meta[name="${name}"]`)?.remove();
    });
};
