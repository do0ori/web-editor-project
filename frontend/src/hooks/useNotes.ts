import { fetchNotes } from "@/apis/notes.api";
import { useQuery } from "@tanstack/react-query";

export const useNotes = () => {
    const { data } = useQuery({
        queryKey: ["notes"],
        queryFn: fetchNotes
    });

    return { notes: data };
};