import { z } from "astro/zod";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const ArticleSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    time: z.date(),
    keywords: z.string().array(),
    draft: z.boolean().optional(),
});

export type ArticleType = z.infer<typeof ArticleSchema>;

export type ArticleCollectionEntry = CollectionEntry<"articles">;

export class Article {
    static getEntry(id: string) {
        return getEntry("articles", id);
    }

    static async getAllEntries() {
        const collection = await getCollection(
            "articles",
            ({ data }) => !data.draft,
        );
        return collection;
    }

    static getReadingTime(body: string) {
        return Math.ceil(body.split(/\s+/g).length / 200);
    }
}
