import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { Category, Todo } from "@/types/todo";
import { useCallback, useEffect, useState } from "react";

export function useTodos() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            const { data } = await api.get<Category[]>("/categories");
            setCategories(data);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    }, []);

    const fetchTodos = useCallback(async (category?: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = !category || category === "All" ? {} : { category };
            const { data } = await api.get<Todo[]>("/todos", { params });
            setTodos(data);
        } catch (err) {
            setError(getErrorMessage(err));
            setTodos([]);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        fetchTodos(selectedCategory);
    }, [fetchTodos, selectedCategory]);

    const refetch = useCallback(() => {
        fetchTodos(selectedCategory);
    }, [fetchTodos, selectedCategory]);

    return { 
        categories, 
        todos, 
        error, 
        refetch, 
        isLoading, 
        selectedCategory, 
        setSelectedCategory 
    };
};

