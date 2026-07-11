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
    static css = `${images}/css.svg`;
    static dart = `${images}/dart.svg`;
    static electron = `${images}/electron.svg`;
    static flutter = `${images}/flutter.svg`;
    static html = `${images}/html.svg`;
    static javascript = `${images}/javascript.svg`;
    static mongodb = `${images}/mongodb.svg`;
    static sqlite = `${images}/sqlite.png`;
    static tailwindcss = `${images}/tailwindcss.svg`;
    static typescript = `${images}/typescript.svg`;
    static vue = `${images}/vue.svg`;
    static nodejs = `${images}/nodejs.svg`;
    static kotlin = `${images}/kotlin.svg`;
    static jetpackCompose = `${images}/jetpack-compose.png`;
    static windows = `${images}/windows.svg`;
    static linux = `${images}/linux.svg`;
    static git = `${images}/git.svg`;
    static vscode = `${images}/vscode.svg`;
    static figma = `${images}/figma.svg`;
    static symphony = `${images}/symphony.svg`;
    static beize = `${images}/beize.svg`;
    static phrasey = `${images}/phrasey.svg`;
    static golang = `${images}/golang.svg`;
    static bash = `${images}/bash.svg`;
    static podman = `${images}/podman.svg`;
    static pho = `${images}/pho.svg`;
    static androidStudio = `${images}/android-studio.png`;
    static java = `${images}/java.svg`;
}

export class ExternalAssets {}
