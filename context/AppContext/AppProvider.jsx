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
        getChatroomInfo,
        realtimeSubscription,
        removeSubscription,
    } = useContext(SupabaseContext);
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const reset = () => {
        dispatch({
            type: types.RESET_STATE,
        });
    };

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
        const { id } = chat;

        const alreadyExists = chats.some(stateChat => stateChat.id === id);
        const isOpenedChat = openedChat && (openedChat.id === id || !openedChat.id);

        dispatch({
            type: types.UPDATE_CHATS,
            payload: {
                chats: alreadyExists
                    ? isMessagesUpdate
                        ? chats.map(stateChat => (stateChat.id === id ? chat : stateChat))
                        : [chat, ...chats.filter(stateChat => stateChat.id !== id)]
                    : [chat, ...chats],
                ...(isOpenedChat && {
                    openedChat: chat.is_hidden && !isMessagesUpdate ? null : chat,
                }),
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
        const updatedChat = await sendMessageToChat(chat, message);
        if (!updatedChat) return setAlert("¡Hubo un error al enviar el mensaje!");

        if (!chat.id) return;

        updateChats(updatedChat);
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
        getChatMessages(openedChat, abortController.signal).then(chatMessages => {
            if (!chatMessages) setAlert("¡Hubo un error al obtener los mensajes!");

            updateChats({ ...openedChat, messages: chatMessages ?? [] }, true);
            setIsLoadingMessages(false);
        });

        return () => abortController.abort();
    }, [state.openedChat]);

    useEffect(() => {
        const { chats } = state;
        if (!chats) return;

        const subscription = realtimeSubscription(
            "INSERT",
            "chats",
            `profile_id=eq.${profile.id}`,
            async ({ new: chat }) => {
                const chatroomInfo = await getChatroomInfo(chat.chatroom_id);
                if (!chatroomInfo) return;

                const updatedChat = {
                    ...chat,
                    created_at: new Date(chat.created_at),
                    ...chatroomInfo,
                };

                updateChats(updatedChat);
            }
        );

        return () => {
            removeSubscription(subscription);
        };
    }, [state.chats, state.openedChat]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                reset,
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
