import { promises as fs } from "fs";
import path from "path";
import { GetAllArticle } from "./core/articles/exports";
import { Paths } from "./constants";
import { generateRSSFeed } from "./core/rss";

const start = async () => {
    await fs.rm(Paths.output, {
        force: true,
        recursive: true,
    });
    await fs.mkdir(Paths.output);

    const articles = await GetAllArticle();

    await fs.writeFile(
        path.join(Paths.output, "articles.json"),
        JSON.stringify(articles.map((x) => x.meta))
    );

    await fs.writeFile(
        path.join(Paths.output, "articles.rss"),
        generateRSSFeed(articles)
    );

    const articlesOutputDir = path.join(Paths.output, "articles");
    await fs.mkdir(articlesOutputDir);
    for (let i = 0; i < articles.length; i++) {
        const x = articles[i]!;
        const xPath = path.join(articlesOutputDir, `${x.meta.slug}.json`);

        await fs.mkdir(path.dirname(xPath), {
            recursive: true,
        });
        await fs.writeFile(xPath, JSON.stringify(x));
    }
};

start();
