'use client';

import CategoryFilter from "@/components/CategoryFilter";
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
    } = useTodos();

    return (
        <Container maxWidth="md" sx={{ py: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Todos
            </Typography>

            <CategoryFilter
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
            />

            <TodoList todos={todos} loading={isLoading} error={error} />

        </Container>
    )
};
