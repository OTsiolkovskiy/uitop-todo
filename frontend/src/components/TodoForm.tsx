"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {
    createTodoSchema,
    type CreateTodoSchema,
} from "@/lib/schema";
import type { Category } from "@/types/todo";

type TodoFormProps = {
    categories: Category[];
    onCreate: (text: string, category: string) => Promise<string | null>;
};

export default function TodoForm({ categories, onCreate }: TodoFormProps) {
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateTodoSchema>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            text: "",
            category: "",
        },
    });

    const onSubmit = async (values: CreateTodoSchema) => {
        setSubmitError(null);
        const apiError = await onCreate(values.text, values.category);
        if (apiError) {
            setSubmitError(apiError);
            return;
        }
        reset({ text: "", category: "" });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mb: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
            <TextField
                label="Task"
                fullWidth
                error={!!errors.text}
                helperText={errors.text?.message}
                {...register("text")}
            />

            <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="todo-category-label">Category</InputLabel>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select
                            labelId="todo-category-label"
                            label="Category"
                            value={field.value}
                            onChange={field.onChange}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors.category && (
                    <Box sx={{ color: "error.main", fontSize: 12, mt: 0.5, ml: 1.75 }}>
                        {errors.category.message}
                    </Box>
                )}
            </FormControl>

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || categories.length === 0}
            >
                Add task
            </Button>
        </Box>
    );
}