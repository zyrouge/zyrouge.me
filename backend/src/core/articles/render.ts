import { EOL } from "os";
import { promises as fs } from "fs";
import markdown from "markdown-it";
import sugar from "sugar";
import path from "path";
import yaml from "yaml";
import { Paths } from "../../constants";
import { Article, ArticleMetadata } from "./model";

export const RenderArticle = async (
    file: string
): Promise<Article | undefined> => {
    const raw = (await fs.readFile(file)).toString();
    const md = markdown({
        linkify: true,
    });

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
        description: md.renderInline(pMeta.description).trim(),
        tags: pMeta.tags.split(",").map((x: string) => x.trim()),
        time: pTime.toUTCString(),
    };

    const content = md.render(rContent).trim();

    return {
        meta,
        content,
    };
};
