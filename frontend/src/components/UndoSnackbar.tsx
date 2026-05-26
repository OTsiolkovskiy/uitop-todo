"use client";

import { Button, Snackbar } from "@mui/material";

type UndoSnackbarProps = {
    open: boolean;
    message: string;
    onUndo: () => void;
    onClose: (event?: unknown, reason?: string) => void;
};

export default function UndoSnackbar({
    open,
    message,
    onUndo,
    onClose,
}: UndoSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            message={message}
            action={
                <Button color="inherit" size="small" onClick={onUndo}>
                    UNDO
                </Button>
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
    );
}
