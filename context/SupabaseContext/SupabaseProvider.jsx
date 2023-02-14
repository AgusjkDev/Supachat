import { useState, useEffect } from "react";

import SupabaseContext from "./SupabaseContext";

import supabase from "utils/supabase";

export default function SupabaseProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);

    const fetchProfile = async newSession => {
        const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("email", newSession.user.email)
            .limit(1)
            .single();

        if (error) {
            return { success: false, error };
        }

        setProfile(data);

        return { success: true };
    };

    const insertProfile = async profile => {
        const { data, error } = await supabase.from("profiles").insert(profile).select().single();

        if (error) {
            return { success: false, error };
        }

        setProfile(data);

        return { success: true };
    };

    const login = async (email, password, fromSignUp = false) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error?.status === 400) {
            return {
                success: false,
                error: !fromSignUp ? "¡Credenciales inválidas!" : "¡Usuario ya registrado!",
            };
        }

        if (error) {
            return { success: false, error };
        }

        const { success, error: fetchError } = await fetchProfile(data.session);
        if (!success) {
            return { success, error: fetchError };
        }

        setSession(data.session);

        return { success: true };
    };

    const signUp = async (username, email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error?.status === 400) {
            return login(email, password, true);
        }

        if (error) {
            return { success: false, error };
        }

        const { success, error: insertError } = await insertProfile({ username, email });
        if (!success) {
            return { success, insertError };
        }

        setSession(data.session);

        return { success: true };
    };

    const logout = () => supabase.auth.signOut();

    useEffect(() => {
        supabase.auth.getSession().then(result => {
            const { data, error } = result;
            if (error) return;

            const { session } = data;
            if (!session) return;

            fetchProfile(session).then(({ success }) => {
                if (!success) return;

                setSession(session);
            });
        });

        supabase.auth.onAuthStateChange((_, changedSession) => {
            if (!changedSession) {
                setSession(changedSession);
            }
        });
    }, []);

    return (
        <SupabaseContext.Provider value={{ supabase, session, profile, login, signUp, logout }}>
            {children}
        </SupabaseContext.Provider>
    );
}
