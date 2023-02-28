import { useContext, useState, useRef, useEffect } from "react";

import { AppContext } from "context";

export default function useChatMessaging(chat) {
    const { sendMessage } = useContext(AppContext);
    const [message, setMessage] = useState("");
    const lastMessageRef = useRef();
    const messageInputRef = useRef();

    const { messages } = chat;

    const sendMessageToChat = () => {
        const cleanMessage = message.trim();
        if (!cleanMessage) return;

        sendMessage(chat, cleanMessage);
        setMessage("");
    };

    useEffect(() => {
        if (!messages || messages.length === 0) return;

        lastMessageRef.current.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        if (message) setMessage("");

        if (document.documentElement.clientWidth <= 1024) return;

        messageInputRef.current.focus();
    }, [chat]);

    return {
        message,
        lastMessageRef,
        messageInputRef,
        updateMessage: setMessage,
        sendMessage: sendMessageToChat,
    };
}
