export const Routes = {
    home: "/",
    articles: {
        home: "/articles",
        read: "/articles",
        rss: "/articles/rss.xml",
        searchJson: "/articles/search.json",
        constructRead: (slug: string) => `${Routes.articles.read}/${slug}`,
    },
};
