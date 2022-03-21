export interface IHeadMetaAttr {
    name: string;
    content: string;
}

export const setTitle = (title: string) => {
    document.title = title;
};

export const setHeadMeta = (attributes: IHeadMetaAttr[]) => {
    return attributes.map((x) => {
        const element =
            document.querySelector<HTMLMetaElement>(`meta[name="${x.name}"]`) ??
            document.createElement("meta");

        Object.entries(x).forEach(([k, v]) => {
            element.setAttribute(k, v);
        });

        if (!element.isConnected) {
            document.head.appendChild(element);
        }

        return element;
    });
};

export const removeHeadMeta = (attributes: IHeadMetaAttr[]) => {
    attributes.forEach((x) => {
        document
            .querySelector(
                `meta${Object.entries(x)
                    .map(([k, v]) => `[${k}="${v}"]`)
                    .join("")}`
            )
            ?.remove();
    });
};
