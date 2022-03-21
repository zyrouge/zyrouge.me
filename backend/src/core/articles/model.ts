export interface ArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    publishedAt: number;
    readingTime: number;
}

export interface Article {
    meta: ArticleMetadata;
    content: string;
}
