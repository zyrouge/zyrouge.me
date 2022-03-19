export interface IArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    time: number;
}

export interface IArticle {
    meta: IArticleMetadata;
    content: string;
}

export class Articles {
    static url = import.meta.env["VITE_API_URL"] ?? "/api";

    static cache = {
        articlesMetadata: null as IArticleMetadata[] | null,
        articles: {} as Record<string, IArticle>,
    };

    static async getAllArticles() {
        if (!Articles.cache.articlesMetadata) {
            const resp = await Articles.request("/articles.json");
            Articles.cache.articlesMetadata =
                (await resp.json()) as IArticleMetadata[];
        }

        return Articles.cache.articlesMetadata;
    }

    static async getArticleFromSlug(slug: string) {
        if (!Articles.cache.articles[slug]) {
            const resp = await Articles.request(`/articles/${slug}.json`);
            Articles.cache.articles[slug] = (await resp.json()) as IArticle;
        }

        return Articles.cache.articles[slug];
    }

    static async request(
        route: string,
        options: RequestInit = {
            method: "GET",
        }
    ) {
        return fetch(`${Articles.url}${route}`, options);
    }
}
