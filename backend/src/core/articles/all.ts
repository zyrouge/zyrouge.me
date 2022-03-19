import readdirp from "readdirp";
import { Article } from "./model";
import { RenderArticle } from "./render";
import { Paths } from "../../constants";

export const GetAllArticle = async (): Promise<Article[]> => {
    const articles: Article[] = [];

    for await (const x of readdirp(Paths.articles, {
        type: "files",
    })) {
        if (x.basename.endsWith(".md")) {
            const article = await RenderArticle(x.fullPath);
            if (article) {
                articles.push(article);
            }
        }
    }

    return articles;
};
