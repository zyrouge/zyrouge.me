import type { APIContext } from "astro";
import { Article } from "@/core/article";
import { Routes } from "@/core/routes";
import { baseUrl } from "@/core/urls";

export const GET = async (_: APIContext) => {
    const articles = await Article.getAllEntries();
    const data = articles.map(({ id, data: meta }) => [
        meta.title,
        meta.description,
        baseUrl + Routes.articles.constructRead(id),
    ]);
    return new Response(JSON.stringify(data));
};
