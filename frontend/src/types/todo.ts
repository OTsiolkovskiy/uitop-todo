export interface Category {
    id: number;
    name: string;
}

export interface Todo {
    id: number;
    text: string;
    category: string;
    completed: boolean;
    created_at: string;
}
