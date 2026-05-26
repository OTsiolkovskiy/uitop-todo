"use client";

import { useCallback, useRef, useState } from "react";
import type { Todo } from "@/types/todo";

const DELAY_MS = 5000;

type PendingKind = "complete" | "delete";

type PendingAction = {
    kind: PendingKind;
    todo: Todo;
    snapshot: Todo[];
    timeoutId: ReturnType<typeof setTimeout>;
};

type UsePendingActionsParams = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    commitComplete: (id: number, completed: boolean) => Promise<string | null>;
    commitDelete: (id: number) => Promise<string | null>;
    onError?: (message: string) => void;
};

export function usePendingActions({
    setTodos,
    commitComplete,
    commitDelete,
    onError,
}: UsePendingActionsParams) {
    const pendingRef = useRef<PendingAction | null>(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const closeSnackbar = useCallback(() => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
    }, []);

    const runCommit = useCallback(
        async (action: PendingAction) => {
            const { kind, todo, snapshot } = action;
            const err =
                kind === "complete"
                    ? await commitComplete(todo.id, true)
                    : await commitDelete(todo.id);

            if (err) {
                onError?.(err);
                setTodos(snapshot);
            }
        },
        [commitComplete, commitDelete, onError, setTodos]
    );

    const flushPending = useCallback(async () => {
        const pending = pendingRef.current;
        if (!pending) return;

        clearTimeout(pending.timeoutId);
        pendingRef.current = null;
        closeSnackbar();
        await runCommit(pending);
    }, [closeSnackbar, runCommit]);

    const startPending = useCallback(
        (kind: PendingKind, todo: Todo, snapshot: Todo[]) => {
            const timeoutId = setTimeout(() => {
                const current = pendingRef.current;
                if (!current || current.todo.id !== todo.id) return;

                pendingRef.current = null;
                closeSnackbar();
                void runCommit(current);
            }, DELAY_MS);

            pendingRef.current = { kind, todo, snapshot, timeoutId };
        },
        [closeSnackbar, runCommit]
    );

    const scheduleComplete = useCallback(
        async (todo: Todo) => {
            if (todo.completed) return;

            await flushPending();

            let snapshot: Todo[] = [];
            setTodos((prev) => {
                snapshot = prev;
                return prev.map((t) =>
                    t.id === todo.id ? { ...t, completed: true } : t
                );
            });

            setSnackbarMessage("Task completed");
            setSnackbarOpen(true);
            startPending("complete", todo, snapshot);
        },
        [flushPending, setTodos, startPending]
    );

    const scheduleDelete = useCallback(
        async (todo: Todo) => {
            await flushPending();

            let snapshot: Todo[] = [];
            setTodos((prev) => {
                snapshot = prev;
                return prev.filter((t) => t.id !== todo.id);
            });

            setSnackbarMessage("Task deleted");
            setSnackbarOpen(true);
            startPending("delete", todo, snapshot);
        },
        [flushPending, setTodos, startPending]
    );

    const undo = useCallback(() => {
        const pending = pendingRef.current;
        if (!pending) return;

        clearTimeout(pending.timeoutId);
        pendingRef.current = null;
        setTodos(pending.snapshot);
        closeSnackbar();
    }, [setTodos, closeSnackbar]);

    const dismiss = useCallback(
        (_event?: unknown, reason?: string) => {
            if (reason === "clickaway") return;
            closeSnackbar();
        },
        [closeSnackbar]
    );

    return {
        snackbarOpen,
        snackbarMessage,
        scheduleComplete,
        scheduleDelete,
        undo,
        dismiss,
    };
}
