const base = "/static";
const images = `${base}/images`;
const icons = `${base}/icons`;

export class ExternalURLs {
    static github = "https://github.com/zyrouge";
    static instagram = "https://instagram.com/_zyrouge_";
    static twitter = "https://twitter.com/_zyrouge_";
}

export class StaticAssets {
    static css = `${images}/css.png`;
    static dart = `${images}/dart.png`;
    static electron = `${images}/electron.png`;
    static flutter = `${images}/flutter.png`;
    static genius = `${images}/genius.png`;
    static html = `${images}/html.png`;
    static javascript = `${images}/javascript.png`;
    static mongodb = `${images}/mongodb.png`;
    static sqlite = `${images}/sqlite.png`;
    static tailwindcss = `${images}/tailwindcss.png`;
    static typescript = `${images}/typescript.png`;
    static vue = `${images}/vue.png`;

    static github = `${icons}/github.svg`;
    static instagram = `${icons}/instagram.svg`;
    static twitter = `${icons}/twitter.svg`;
}

export class SiteMetadata {
    static title = "Zyrouge";

    static getTitle(title: string) {
        return `${title} | ${SiteMetadata.title}`;
    }
}
