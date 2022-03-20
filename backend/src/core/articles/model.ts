export interface ArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    time: string;
}

export interface Article {
    meta: ArticleMetadata;
    content: string;
}
