import { Api, ApiURLs } from "./base";

export interface IArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    publishedAt: number;
    readingTime: number;
}

export interface IArticle {
    meta: IArticleMetadata;
    content: string;
}

export class Articles {
    static cache = {
        articlesMetadata: null as IArticleMetadata[] | null,
        articles: {} as Record<string, IArticle>,
    };

    static async getAllArticles() {
        if (!Articles.cache.articlesMetadata) {
            const resp = await Api.request(ApiURLs.articlesJson);
            Articles.cache.articlesMetadata =
                (await resp.json()) as IArticleMetadata[];
        }

        return Articles.cache.articlesMetadata;
    }

    static async getArticleFromSlug(slug: string) {
        if (!Articles.cache.articles[slug]) {
            const resp = await Api.request(ApiURLs.getArticlesSlug(slug));
            Articles.cache.articles[slug] = (await resp.json()) as IArticle;
        }

        return Articles.cache.articles[slug];
    }
}
