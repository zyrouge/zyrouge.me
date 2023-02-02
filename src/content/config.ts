import { defineCollection } from "astro:content";
import { ArticleSchema } from "./types";

const ArticlesCollection = defineCollection({
    schema: ArticleSchema,
});

export const collections = {
    articles: ArticlesCollection,
};
