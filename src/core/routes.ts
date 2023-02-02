export const Routes = {
    home: "/",
    articles: {
        home: "/articles",
        read: "/articles",
        rss: "/articles/rss.xml",
        constructRead: (slug: string) => `${Routes.articles.read}/${slug}`,
    },
};
