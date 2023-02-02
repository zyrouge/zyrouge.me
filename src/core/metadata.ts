export interface HeadMetadata {
    title: string;
    description: string;
    meta: Record<string, string>;
}

export class Metadata {
    static title = "Zyrouge";
    static infix = "/";
    static author = "Zyrouge";
    static mail = "zyrouge@hotmail.com";

    static defaultMeta = {
        author: `${Metadata.author}, ${Metadata.mail}`,
        "og:image": "/banner.png",
        "og:type": "website",
        robots: "all",
        "theme-color": "#d946ef",
    };

    static constructTitle(title: string) {
        return `${title} ${Metadata.infix} ${Metadata.title}`;
    }
}
