import RSS from "rss";
import { SitePaths, SiteTitles } from "../constants";
import { Article } from "./articles/exports";

export const generateRSSFeed = (articles: Article[]) => {
    const rss = new RSS({
        title: SiteTitles.articlesTitle,
        site_url: SitePaths.articles,
        feed_url: SitePaths.articlesRss,
        language: SiteTitles._siteLang,
        pubDate: new Date(Date.now()),
    });

    articles
        .sort((a, b) => b.meta.publishedAt - a.meta.publishedAt)
        .slice(0, 10)
        .forEach((x) => {
            rss.item({
                title: x.meta.title,
                description: x.meta.description,
                url: SitePaths.getArticlePath(x.meta.slug),
                guid: x.meta.slug,
                date: new Date(x.meta.publishedAt),
                author: SiteTitles._siteAuthor,
                categories: x.meta.tags,
            });
        });

    return rss.xml();
};
