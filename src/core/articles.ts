import { CollectionEntry, getCollection } from "astro:content";

export type ArticleCollectionEntry = CollectionEntry<"articles">;

export class Articles {
    static async fetchAll(): Promise<ArticleCollectionEntry[]> {
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
