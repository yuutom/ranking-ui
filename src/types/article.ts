export interface Article {
    id: number;
    title: string;
    category: string;
    imageUrl?: string;
    content: string;
    isPickedUp: boolean;
    createdDate: string;
}