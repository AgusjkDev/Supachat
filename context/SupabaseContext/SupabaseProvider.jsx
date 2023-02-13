import { useState, useEffect } from "react";

import SupabaseContext from "./SupabaseContext";

import supabase from "utils/supabase";

export default function SupabaseProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);

    const fetchProfile = async newSession => {
        const result = await supabase
            .from("profiles")
            .select()
            .eq("email", newSession.user.email)
            .limit(1)
            .single();

        if (result.error) {
            return console.error(error);
        }

        setProfile(result.data);
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error?.status === 400) {
            return console.error("credenciales inválidas");
        }

        if (error) {
            return console.error(error);
        }

        setSession(data.session);
        fetchProfile(data.session);
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

        const result = await supabase
            .from("profiles")
            .insert({ username, email })
            .select()
            .single();

        if (result.error) {
            return console.error(error);
        }

        setProfile(result.data);
    };

    useEffect(() => {
        supabase.auth.getSession().then(result => {
            const { data, error } = result;

            if (error) {
                return console.error(error);
            }

            setSession(data.session);
            fetchProfile(data.session);
        });

        supabase.auth.onAuthStateChange((event, changedSession) => {
            if (!changedSession) {
                setSession(changedSession);
            }
        });
    }, []);

    return (
        <SupabaseContext.Provider value={{ supabase, session, profile, login, signUp }}>
            {children}
        </SupabaseContext.Provider>
    );
}
