export class Api {
    static url = import.meta.env["VITE_API_URL"] ?? "/api";

    static async request(
        route: string,
        options: RequestInit = {
            method: "GET",
        }
    ) {
        return fetch(route, options);
    }
}

export class ApiURLs {
    static articlesJson = `${Api.url}/articles.json`;
    static articlesRss = `${Api.url}/articles.rss.xml`;

    static getArticlesSlug(slug: string) {
        return `${Api.url}/articles/${slug}.json`;
    }
}
