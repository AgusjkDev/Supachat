import types from "./types";

export default function AppReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_CHATS:
            return {
                ...state,
                chats: payload,
            };

        case types.SET_OPENED_CHAT:
            return {
                ...state,
                openedChat: payload,
            };

        case types.SET_IS_LOADING_MESSAGES:
            return {
                ...state,
                isLoadingMessages: payload,
            };

        case types.UPDATE_CHAT_MESSAGES:
            return {
                ...state,
                ...payload,
            };

        case types.UPDATE_CHATS:
            return {
                ...state,
                ...payload,
            };

        case types.SET_SHOW_OPTIONS:
            return {
                ...state,
                showOptions: payload,
            };

        case types.SET_ALERT:
            return {
                ...state,
                alert: payload,
            };

        default:
            return state;
    }
}
