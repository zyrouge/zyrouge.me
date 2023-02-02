const domain = "zyrouge.is-a.dev";
const base = "/static";
const images = `${base}/images`;

export const baseUrl = `https://${domain}`;

export class ExternalUrls {
    static github = "https://github.com/zyrouge";
    static instagram = "https://instagram.com/_zyrouge_";
    static twitter = "https://twitter.com/_zyrouge_";
    static discord = "https://discord.gg/8KV5zCg";

    static ghRepo = `${ExternalUrls.github}/${domain}`;
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
}

export class ExternalAssets {
    static uprightQuotesLogo =
        "https://zyrouge.github.io/upright-quotes/logo.png";
}
