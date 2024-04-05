import { Note, createNote, deleteNote, fetchNote, updateNote } from "@/apis/notes.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNote = (id: number) => {
    const { data: note } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNote(id)
    });

    return { note };
};

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: create } = useMutation({
        mutationFn: () => createNote({ title: "", content: "" }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] })
    });

    return { create };
};

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: update } = useMutation({
        mutationFn: async ({ id, ...noteData }: Pick<Note, "id" | "title" | "content">) => {
            await updateNote(id, noteData);
            alert("저장되었습니다.");
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] })
    });

    return { update };
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: remove } = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] })
    });

    return { remove };
};
