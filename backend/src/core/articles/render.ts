import { EOL } from "os";
import { promises as fs } from "fs";
import markdown from "markdown-it";
import path from "path";
import yaml from "yaml";
import { Paths } from "../../constants";
import { Article, ArticleMetadata } from "./model";

export const RenderArticle = async (
    file: string
): Promise<Article | undefined> => {
    const stat = await fs.stat(file);
    const raw = (await fs.readFile(file)).toString();
    const md = markdown();

    const [rMeta, rContent] = raw.split(`${EOL}---${EOL}`);
    if (!rMeta || !rContent) {
        throw new Error(`Invalid content in ${file}`);
    }

    const pMeta = yaml.parse(rMeta);
    if (pMeta.draft === true) return;

    const meta: ArticleMetadata = {
        slug: path.relative(Paths.articles, file).replace(/\.md$/, ""),
        title: pMeta.title.trim(),
        description: md.renderInline(pMeta.description).trim(),
        tags: pMeta.tags.split(",").map((x: string) => x.trim()),
        writtenAt: stat.birthtime.getTime(),
        updatedAt: stat.mtime.getTime(),
    };
    if (meta.writtenAt === meta.updatedAt) {
        delete meta.updatedAt;
    }

    const content = md.render(rContent).trim();

    return {
        meta,
        content,
    };
};
