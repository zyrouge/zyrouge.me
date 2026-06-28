import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { ArticleSchema } from "./core/article";

const ArticlesCollection = defineCollection({
    loader: glob({ base: "./content", pattern: "**/*.{md,mdx}" }),
    schema: ArticleSchema,
});

export const collections = {
    articles: ArticlesCollection,
};
