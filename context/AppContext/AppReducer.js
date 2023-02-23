import types from "./types";

export default function AppReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_SHOW_OPTIONS:
            return {
                ...state,
                showOptions: payload,
            };

        default:
            return state;
    }
}
