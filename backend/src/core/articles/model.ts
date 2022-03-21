export interface ArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    time: number;
}

export interface Article {
    meta: ArticleMetadata;
    content: string;
}
