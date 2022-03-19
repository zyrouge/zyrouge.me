const base = "/static";
const images = `${base}/images`;

export class StaticAssets {
    static css = `${images}/css.png`;
    static dart = `${images}/dart.png`;
    static flutter = `${images}/flutter.png`;
    static html = `${images}/html.png`;
    static javascript = `${images}/javascript.png`;
    static mongodb = `${images}/mongodb.png`;
    static sqlite = `${images}/sqlite.png`;
    static tailwindcss = `${images}/tailwindcss.png`;
    static typescript = `${images}/typescript.png`;
    static vue = `${images}/vue.png`;
}

export class SiteMetadata {
    static title = "Zyrouge";

    static getTitle(title: string) {
        return `${title} | ${SiteMetadata.title}`;
    }
}
