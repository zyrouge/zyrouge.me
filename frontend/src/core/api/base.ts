export class Api {
    static url = import.meta.env["VITE_API_URL"] ?? "/api";

    static async request(route: string, options?: RequestInit) {
        return fetch(route, {
            method: "GET",
            cache: "no-cache",
            ...options,
        });
    }
}

export class ApiURLs {
    static articlesJson = `${Api.url}/articles.json`;
    static articlesRss = `${Api.url}/articles.rss.xml`;

    static getArticlesSlug(slug: string) {
        return `${Api.url}/articles/${slug}.json`;
    }
}
