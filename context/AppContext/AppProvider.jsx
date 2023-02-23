import { useContext, useReducer, useEffect } from "react";

import { SupabaseContext } from "context";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import types from "./types";

export default function AppProvider({ children }) {
    const { session, profile, getChats } = useContext(SupabaseContext);
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setChats = chats => {
        dispatch({
            type: types.SET_CHATS,
            payload: chats,
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

    return (
        <AppContext.Provider value={{ ...state, toggleShowOptions }}>
            {children}
        </AppContext.Provider>
    );
}
