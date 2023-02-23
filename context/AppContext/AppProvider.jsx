import { useReducer } from "react";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import types from "./types";

export default function AppProvider({ children }) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const toggleShowOptions = () => {
        dispatch({
            type: types.SET_SHOW_OPTIONS,
            payload: !state.showOptions,
        });
    };

    return (
        <AppContext.Provider value={{ ...state, toggleShowOptions }}>
            {children}
        </AppContext.Provider>
    );
}
