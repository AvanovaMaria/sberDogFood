export {};

declare global {
    interface Author {
        name: string;
        about?: string;
        avatar?: string;
        _id: string;
        email?: string;
        __v?: number;
    }

    interface Review {
        rating: number;
        _id: string;
        text: string;
        author: ReviewAuthor;
        product: string;
        created_at?: string;
        updated_at?: string;
        __v: number;
    }
    
    interface Item {
        _id: string;
        name: string;
        price: number;
        wight: string;
        description: string;
        created_at?: string;
        updated_at?: string;
        __v?: number;
        discount?: number;
        stock?: number;
        available: boolean;
        pictures?: string;
        isPublished?: boolean;
        tags?: string[];
        likes: string[];
        reviews: Review[];
    }

    interface ItemLikeParams {
        likes: string[];
        _id: string;
    };

    interface ReviewAuthor {
        name?: string;
        about?: string;
        _id: string;
        avatar?: string;
        email?: string;
        group?: string;
        __v?: number;
    }
}