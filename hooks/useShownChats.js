import { useState, useEffect } from "react";

export default function useShownChats(chats) {
    const [isLoading, setIsLoading] = useState(true);
    const [shownChats, setShownChats] = useState(null);

    useEffect(() => {
        if (!chats) return;
        if (isLoading) setIsLoading(false);

        const filteredChats = chats.filter(chat => !chat.is_hidden);

        setShownChats(filteredChats.length !== 0 ? filteredChats : null);
    }, [chats]);

    return { isLoading, shownChats };
}
