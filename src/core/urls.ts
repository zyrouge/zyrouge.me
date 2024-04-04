const domain = "zyrouge.is-a.dev";
const base = "/static";
const images = `${base}/images`;

export const baseUrl = `https://${domain}`;

export class ExternalUrls {
    static github = "https://github.com/zyrouge";
    static discord = "https://discord.gg/8KV5zCg";
    static mastodon = "https://mastodon.social/@zyrouge";
    static reddit = "https://www.reddit.com/user/zyrouge";

    static ghRepo = `${ExternalUrls.github}/${domain}`;
    static ghRepoLicense = `${ExternalUrls.ghRepo}/blob/main/LICENSE`;
    static ghRepoContentLicense = `${ExternalUrls.ghRepo}/blob/main/src/content/articles/LICENSE`;
}

export class StaticAssets {
    static css = `${images}/css.png`;
    static dart = `${images}/dart.png`;
    static electron = `${images}/electron.png`;
    static flutter = `${images}/flutter.png`;
    static html = `${images}/html.png`;
    static javascript = `${images}/javascript.png`;
    static mongodb = `${images}/mongodb.png`;
    static sqlite = `${images}/sqlite.png`;
    static tailwindcss = `${images}/tailwindcss.png`;
    static typescript = `${images}/typescript.png`;
    static vue = `${images}/vue.png`;
    static nodejs = `${images}/nodejs.png`;
    static kotlin = `${images}/kotlin.png`;
    static compose = `${images}/compose.png`;
    static windows = `${images}/windows.png`;
    static linux = `${images}/linux.png`;
    static git = `${images}/git.png`;
    static vscode = `${images}/vscode.png`;
    static figma = `${images}/figma.png`;
    static symphony = `${images}/symphony.png`;
    static beize = `${images}/beize.png`;
    static phrasey = `${images}/phrasey.png`;
    static uprightQuotes = `${images}/upright-quotes.png`;
    static go = `${images}/go.png`;
    static bash = `${images}/bash.png`;
    static podman = `${images}/podman.png`;
    static pho = `${images}/pho.png`;
}

export class ExternalAssets {}
