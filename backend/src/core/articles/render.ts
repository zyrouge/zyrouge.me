import { EOL } from "os";
import { promises as fs } from "fs";
import markdown from "markdown-it";
import sugar from "sugar";
import path from "path";
import yaml from "yaml";
import { Paths } from "../../constants";
import { Article, ArticleMetadata } from "./model";

const GetMarkdownRenderer = () => {
    const client = markdown({
        linkify: true,
    });

    [require("markdown-it-sub"), require("markdown-it-sup")].forEach((x) => {
        client.use(x);
    });

    return client;
};

export const RenderArticle = async (
    file: string
): Promise<Article | undefined> => {
    const raw = (await fs.readFile(file)).toString();
    const markdown = GetMarkdownRenderer();

    const [rMeta, rContent] = raw.split(`${EOL}---${EOL}`);
    if (!rMeta || !rContent) {
        throw new Error(`Invalid content in ${file}`);
    }

    const pMeta = yaml.parse(rMeta);
    if (pMeta.draft === true) return;

    const pTime = sugar.Date.create(pMeta.time);
    if (isNaN(pTime.getTime())) {
        throw new Error(`Invalid time in ${file}`);
    }

    const meta: ArticleMetadata = {
        slug: path.relative(Paths.articles, file).replace(/\.md$/, ""),
        title: pMeta.title.trim(),
        description: markdown.renderInline(pMeta.description).trim(),
        tags: pMeta.tags.split(",").map((x: string) => x.trim()),
        publishedAt: pTime.getTime(),
        readingTime: Math.ceil(rContent.split(/\s+/g).length / 200),
    };

    const content = markdown.render(rContent).trim();

    return {
        meta,
        content,
    };
};
