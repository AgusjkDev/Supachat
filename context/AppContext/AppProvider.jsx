import { useContext, useReducer, useEffect } from "react";

import { SupabaseContext } from "context";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import types from "./types";
import { ALERT_TIMEOUT } from "constants";

export default function AppProvider({ children }) {
    const {
        session,
        profile,
        getChats,
        hideChat,
        getChatMessages,
        sendMessageToChat,
        createChatAndSendMessage,
    } = useContext(SupabaseContext);
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setAlert = alert => {
        dispatch({
            type: types.SET_ALERT,
            payload: alert,
        });
    };

    const setChats = chats => {
        dispatch({
            type: types.SET_CHATS,
            payload: chats,
        });
    };

    const setOpenedChat = chat => {
        dispatch({
            type: types.SET_OPENED_CHAT,
            payload: chat,
        });
    };

    const updateChats = (chat, isMessagesUpdate = false) => {
        const { chats, openedChat } = state;
        const { chat_id } = chat;

        const alreadyExists = chats.some(stateChat => stateChat.chat_id === chat_id);
        const isOpenedChat = openedChat && (openedChat.chat_id === chat_id || !openedChat.chat_id);

        dispatch({
            type: types.UPDATE_CHATS,
            payload: {
                chats: alreadyExists
                    ? isMessagesUpdate
                        ? chats.map(stateChat => (stateChat.chat_id === chat_id ? chat : stateChat))
                        : [chat, ...chats.filter(stateChat => stateChat.chat_id !== chat_id)]
                    : [chat, ...chats],
                ...(isOpenedChat && { openedChat: !chat.is_hidden ? chat : null }),
            },
        });
    };

    const setChatHidden = async chat => {
        const hiddenChat = await hideChat(chat);
        if (!hiddenChat) return setAlert("¡Hubo un error al ocultar el chat!");

        updateChats(hiddenChat);
    };

    const setIsLoadingMessages = newValue => {
        dispatch({
            type: types.SET_IS_LOADING_MESSAGES,
            payload: newValue,
        });
    };

    const sendMessage = async (chat, message) => {
        const chatExists = Boolean(chat.chat_id);

        if (chatExists) {
            const updatedMessages = await sendMessageToChat(chat, message);
            if (!updatedMessages) return setAlert("¡Hubo un error al enviar el mensaje!");

            updateChats({ ...chat, messages: updatedMessages });

            return;
        }

        const createdChat = await createChatAndSendMessage(chat.profile, message);
        if (!createdChat) return setAlert("¡Hubo un error al enviar el mensaje!");

        updateChats(createdChat);
    };

    useEffect(() => {
        if (!state.alert || !ALERT_TIMEOUT) return;

        const timeoutId = setTimeout(() => setAlert(""), ALERT_TIMEOUT);

        return () => clearTimeout(timeoutId);
    }, [state.alert]);

    useEffect(() => {
        if (!session || !profile) return;

        getChats().then(chats => {
            if (!chats) setAlert("¡Hubo un error al obtener tus chats!");

            setChats(chats ?? []);
        });
    }, [session, profile]);

    useEffect(() => {
        const { openedChat } = state;
        if (!openedChat || openedChat.messages) return;

        const abortController = new AbortController();

        setIsLoadingMessages(true);
        getChatMessages(openedChat.chat_id, abortController.signal).then(chatMessages => {
            if (!chatMessages) setAlert("¡Hubo un error al obtener los mensajes!");

            updateChats({ ...openedChat, messages: chatMessages ?? [] }, true);
            setIsLoadingMessages(false);
        });

        return () => abortController.abort();
    }, [state.openedChat]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                setAlert,
                setOpenedChat,
                setChatHidden,
                sendMessage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
