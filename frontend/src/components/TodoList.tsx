import { Todo } from "@/types/todo";
import { Alert, Box, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";

type TodoListProps = {
    todos: Todo[];
    loading: boolean;
    error: string | null;
};

export default function TodoList({ todos, loading, error }: TodoListProps) {
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        )
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
                <ListItem key={todo.id} divider>
                    <ListItemText
                        primary={todo.text}
                        secondary={`${todo.category} · ${todo.completed ? "Done" : "Active"}`}
                        sx={{
                            textDecoration: todo.completed ? "line-through" : "none",
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );

}