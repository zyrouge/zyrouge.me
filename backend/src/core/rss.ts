import RSS from "rss";
import { SitePaths, SiteTitles } from "../constants";
import { Article } from "./articles/exports";

export const generateRSSFeed = (articles: Article[]) => {
    const rss = new RSS({
        title: SiteTitles.articlesTitle,
        site_url: SitePaths.articles,
        feed_url: SitePaths.articlesRss,
    });

    articles
        .sort((a, b) => b.meta.publishedAt - a.meta.publishedAt)
        .forEach((x) => {
            rss.item({
                title: x.meta.title,
                description: x.meta.description,
                url: SitePaths.getArticlePath(x.meta.slug),
                date: new Date(x.meta.publishedAt),
                author: SiteTitles._siteAuthor,
                categories: x.meta.tags,
            });
        });

    return rss.xml();
};
