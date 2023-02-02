import { CollectionEntry, getCollection } from "astro:content";

export class Articles {
    static async fetchAll() {
        const collection = await getCollection(
            "articles",
            (x): x is CollectionEntry<"articles"> => !x.data.draft
        );
        return collection;
    }

    static getReadingTime(body: string) {
        return Math.ceil(body.split(/\s+/g).length / 200);
    }
}
