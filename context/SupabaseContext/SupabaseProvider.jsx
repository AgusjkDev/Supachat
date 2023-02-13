import { useState, useEffect } from "react";

import SupabaseContext from "./SupabaseContext";

import supabase from "utils/supabase";

export default function SupabaseProvider({ children }) {
    const [session, setSession] = useState(null);

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error?.status === 400) {
            return console.error("credenciales inválidas");
        }

        if (error) {
            return console.error(error);
        }

        setSession(data.session);
    };

    const signUp = async (username, email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error?.status === 400) {
            return login(email, password);
        }

        if (error) {
            return console.error(error);
        }

        setSession(data.session);

        await supabase.from("profiles").insert({ username, email });
    };

    useEffect(() => {
        supabase.auth.getSession().then(result => {
            const { data, error } = result;

            if (error) {
                return console.error(error);
            }

            setSession(data.session);
        });

        supabase.auth.onAuthStateChange((event, changedSession) => {
            if (!changedSession) {
                setSession(changedSession);
            }
        });
    }, []);

    return (
        <SupabaseContext.Provider value={{ supabase, session, login, signUp }}>
            {children}
        </SupabaseContext.Provider>
    );
}
