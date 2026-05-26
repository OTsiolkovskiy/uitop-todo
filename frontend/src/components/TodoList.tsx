import { Todo } from "@/types/todo";
import { Alert, Box, CircularProgress, List, Typography } from "@mui/material";
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
};

export default function TodoList({ todos, loading, error, onToggle, onDelete }: TodoListProps) {
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (todos.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography color="text.secondary">No tasks</Typography>
            </Box>
        );
    }

    return (
        <List>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </List>
    );
}
