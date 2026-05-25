export interface Category {
    id: number;
    name: string;
}

export type TodoRow = {
    id: number;
    text: string;
    category: string;
    completed: number;
    created_at: string;
}

export interface Todo {
    id: number;
    text: string;
    category: string;
    completed: boolean;
    created_at: string;
}

export interface CreateTodo {
    text: string;
    category: string;
}

export interface UpdateTodoStatusBody {
    completed: boolean;
}
