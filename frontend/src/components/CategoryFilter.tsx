'use client';

import { Category } from "@/types/todo";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type CategoryFilterProps = {
    categories: Category[];
    value: string;
    onChange: (value: string) => void;
};

export default function CategoryFilter({
    categories,
    value,
    onChange,
}: CategoryFilterProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={value}
              label="Category"
              onChange={handleChange}
            >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}