const domain = "zyrouge.me";
const images = "/static/images";

export const baseUrl = `https://${domain}`;

export class ExternalUrls {
    static github = "https://github.com/zyrouge";
    static discord = "https://discord.gg/8KV5zCg";
    static mastodon = "https://mastodon.social/@zyrouge";
    static reddit = "https://www.reddit.com/user/zyrouge";
    static bsky = "https://bsky.app/profile/zyrouge.me";
    static mail = "mailto:hello@zyrouge.me";

    static ghRepo = `${ExternalUrls.github}/${domain}`;
    static ghRepoMainBranch = `${ExternalUrls.ghRepo}/blob/main`;
    static ghRepoLicense = `${ExternalUrls.ghRepo}/blob/main/LICENSE`;
    static ghRepoContentLicense = `${ExternalUrls.ghRepo}/blob/main/src/content/articles/LICENSE`;

    static ghRepoFileUrl(filepath: string) {
        return `${ExternalUrls.ghRepoMainBranch}/blob/main/${filepath}`;
    }

    static ghRepoFileHistoryUrl(filepath: string) {
        return `${ExternalUrls.ghRepo}/commits/main/${filepath}`;
    }
}

export class StaticAssets {
    static icon = "/icon.png";
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
    static symphony = `${images}/symphony.svg`;
    static beize = `${images}/beize.svg`;
    static phrasey = `${images}/phrasey.svg`;
    static go = `${images}/go.png`;
    static bash = `${images}/bash.png`;
    static podman = `${images}/podman.png`;
    static pho = `${images}/pho.svg`;
    static androidStudio = `${images}/android-studio.png`;
    static java = `${images}/java.png`;
}

export class ExternalAssets {}
