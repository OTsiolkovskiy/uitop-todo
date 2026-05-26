"use client";

import CategoryFilter from "@/components/CategoryFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import UndoSnackbar from "@/components/UndoSnackbar";
import { useTodos } from "@/hooks/useTodos";
import { usePendingActions } from "@/hooks/usePendingActions";
import { Alert, Container, Typography } from "@mui/material";
import { useState } from "react";

export default function TodosPage() {
    const {
        categories,
        todos,
        setTodos,
        selectedCategory,
        setSelectedCategory,
        isLoading,
        error,
        createTodo,
        commitComplete,
        commitDelete,
        refetch,
    } = useTodos();

    const [actionError, setActionError] = useState<string | null>(null);

    const pending = usePendingActions({
        setTodos,
        commitComplete,
        commitDelete,
        onError: (msg) => setActionError(msg),
        onCommitSuccess: refetch,
    });

    const handleToggle = async (id: number, checked: boolean) => {
        if (pending.isPending) return;

        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        setActionError(null);

        if (checked) {
            pending.scheduleComplete(todo);
        } else {
            const err = await commitComplete(id, false);
            if (err) {
                setActionError(err);
            } else {
                refetch();
            }
        }
    };

    const handleDelete = (id: number) => {
        if (pending.isPending) return;

        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        setActionError(null);
        pending.scheduleDelete(todo);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Todos
            </Typography>

            <TodoForm categories={categories} onCreate={createTodo} />

            <CategoryFilter
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
            />

            {actionError && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() => setActionError(null)}
                >
                    {actionError}
                </Alert>
            )}

            <TodoList
                todos={todos}
                loading={isLoading}
                error={error}
                actionsDisabled={pending.isPending}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />

            <UndoSnackbar
                open={pending.snackbarOpen}
                message={pending.snackbarMessage}
                onUndo={pending.undo}
                onClose={pending.dismiss}
            />
        </Container>
    );
}
