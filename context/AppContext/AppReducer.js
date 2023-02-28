import initialState from "./initialState";
import types from "./types";

export default function AppReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.RESET_STATE:
            return initialState;

        case types.SET_ALERT:
            return {
                ...state,
                alert: payload,
            };

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

        case types.UPDATE_CHATS:
            return {
                ...state,
                ...payload,
            };

        case types.SET_IS_LOADING_MESSAGES:
            return {
                ...state,
                isLoadingMessages: payload,
            };

        default:
            return state;
    }
}
