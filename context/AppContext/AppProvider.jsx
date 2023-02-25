import { useContext, useReducer, useEffect } from "react";

import { SupabaseContext } from "context";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import types from "./types";

export default function AppProvider({ children }) {
    const { session, profile, getChats, getChatMessages } = useContext(SupabaseContext);
    const [state, dispatch] = useReducer(AppReducer, initialState);

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

    const exitOpenedChat = () => {
        dispatch({
            type: types.SET_OPENED_CHAT,
            payload: null,
        });
    };

    const setIsLoadingMessages = newValue => {
        dispatch({
            type: types.SET_IS_LOADING_MESSAGES,
            payload: newValue,
        });
    };

    const setChatMessages = (openedChat, chatMessages) => {
        const updatedOpenedChat = { ...openedChat, messages: chatMessages };
        const updatedChats = state.chats.map(chat =>
            chat.chat_id === openedChat.chat_id ? updatedOpenedChat : chat
        );

        dispatch({
            type: types.UPDATE_CHAT_MESSAGES,
            payload: {
                openedChat: updatedOpenedChat,
                chats: updatedChats,
            },
        });
    };

    const toggleShowOptions = () => {
        dispatch({
            type: types.SET_SHOW_OPTIONS,
            payload: !state.showOptions,
        });
    };

    useEffect(() => {
        if (!session || !profile) return;

        getChats().then(setChats);
    }, [session, profile]);

    useEffect(() => {
        const { openedChat } = state;
        if (!openedChat || openedChat.messages) return;

        const abortController = new AbortController();

        setIsLoadingMessages(true);
        getChatMessages(openedChat.chat_id, abortController.signal).then(chatMessages => {
            if (chatMessages) setChatMessages(openedChat, chatMessages);

            setIsLoadingMessages(false);
        });

        return () => abortController.abort();
    }, [state.openedChat]);

    return (
        <AppContext.Provider value={{ ...state, setOpenedChat, exitOpenedChat, toggleShowOptions }}>
            {children}
        </AppContext.Provider>
    );
}
