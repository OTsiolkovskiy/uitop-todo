'use client';

import CategoryFilter from "@/components/CategoryFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";
import { Container, Typography } from "@mui/material";

export default function TodosPage() {
    const {
        categories,
        todos,
        selectedCategory,
        setSelectedCategory,
        isLoading,
        error,
        createTodo 
    } = useTodos();

    return (
        <Container maxWidth="md" sx={{ py: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Todos
            </Typography>

            <TodoForm categories={categories} onCreate={createTodo} />

            <CategoryFilter
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
            />

            <TodoList todos={todos} loading={isLoading} error={error} />

        </Container>
    )
};
