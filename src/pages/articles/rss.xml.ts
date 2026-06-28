import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { Article } from "@/core/article";
import { Metadata } from "@/core/metadata";
import { Routes } from "@/core/routes";
import { baseUrl } from "@/core/urls";

export const GET = async (_: APIContext) => {
    const articles = await Article.getAllEntries();
    return rss({
        title: Metadata.constructTitle("Articles"),
        description: "",
        site: baseUrl + Routes.articles.home,
        customData: xmlify({
            lastBuildDate: new Date().toUTCString(),
        }),
        items: articles.map(({ id, data: meta }) => ({
            title: meta.title,
            description: meta.description,
            link: baseUrl + Routes.articles.constructRead(id),
            pubDate: meta.time,
            customData: xmlify({
                guid: id,
                author: Metadata.author,
                category: meta.category,
                tags: meta.tags.join(", "),
            }),
        })),
    });
};

const xmlify = (tags: Record<string, string>) => {
    let output = "";
    Object.entries(tags).forEach(([k, v]) => {
        output += `<${k}>${v}</${k}>\n`;
    });
    return output;
};
