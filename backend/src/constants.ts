import path from "path";

export class Paths {
    static base = path.resolve(__dirname, "..");
    static root = path.dirname(Paths.base);
    static articles = path.resolve(Paths.root, "articles");
    static output = path.resolve(Paths.base, "dist");
}

export class SiteTitles {
    static suffix = "Zyrouge";
    static infix = "/";
    static articlesTitle = `Article ${SiteTitles.infix} ${SiteTitles.suffix}`;

    static _siteAuthor = SiteTitles.suffix;
    static _siteLang = "en";
}

export class SitePaths {
    static base = "https://zyrouge.is-a.dev";
    static articles = `${SitePaths.base}/articles`;

    static _articlesRssBasename = "articles.rss.xml";
    static articlesRss = `${SitePaths.base}/api/${SitePaths._articlesRssBasename}`;

    static getArticlePath(slug: string) {
        return `${SitePaths.articles}/read/${slug}`;
    }
}
