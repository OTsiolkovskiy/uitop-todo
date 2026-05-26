"use client";

import {
    Checkbox,
    Chip,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Todo } from "@/types/todo";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <ListItem
            divider
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(todo.id)}
                >
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.completed}
                        onChange={(e) => onToggle(todo.id, e.target.checked)}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={todo.text}
                    secondary={
                        <Chip label={todo.category} size="small" sx={{ mt: 0.5 }} />
                    }
                    slotProps={{
                        primary: {
                            sx: {
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                            },
                        },
                        secondary: { component: "div" },
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}