export interface ArticleMetadata {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    writtenAt: number;
    updatedAt?: number;
}

export interface Article {
    meta: ArticleMetadata;
    content: string;
}
