import { useState, useMemo } from "react";

export default function useFilteredChats(chats) {
    const [isLoading, setIsLoading] = useState(true);

    const filteredChats = useMemo(() => {
        if (!chats) return null;

        if (isLoading) setIsLoading(false);

        return chats
            .filter(chat => !chat.is_hidden)
            .sort((a, b) => b.last_message.created_at - a.last_message.created_at);
    }, [chats]);

    return { isLoading, filteredChats };
}
