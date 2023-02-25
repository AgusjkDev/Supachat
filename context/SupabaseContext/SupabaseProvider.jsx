import { useState, useEffect } from "react";

import SupabaseContext from "./SupabaseContext";

import supabase from "utils/supabase";
import { groupMessages } from "helpers";
import { MIN_LOADING_SCREEN_TIME } from "constants";

export default function SupabaseProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    const fetchProfile = async newSession => {
        const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("email", newSession.user.email)
            .single();

        if (error) return { success: false, error };

        setProfile(data);

        return { success: true };
    };

    const insertProfile = async profile => {
        const { data, error } = await supabase
            .from("profiles")
            .insert({ ...profile, email: undefined })
            .select()
            .single();

        if (error) return { success: false, error };

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

    const searchQuery = async query => {
        const { data, error } = await supabase
            .from("profiles")
            .select()
            .ilike("username", `${query}%`);

        if (error) {
            console.error(error);

            return null;
        }

        return data;
    };

    const getChatsId = async () => {
        const { data, error } = await supabase
            .from("chat_participants")
            .select("chat_id")
            .eq("profile_id", profile.id);

        if (error) {
            console.error(error);

            return null;
        }

        return data.map(({ chat_id }) => chat_id);
    };

    const getChats = async () => {
        const chatsId = await getChatsId();
        if (!chatsId) return null;
        if (chatsId.length === 0) return [];

        const { data, error } = await supabase
            .from("chat_participants")
            .select(
                `
                chat_id,
                profiles:profile_id(
                    created_at,
                    username,
                    profile_picture,
                    status
                ),
                chats:chat_id(
                    messages:last_message(
                        profile_id,
                        created_at,
                        content
                    )
                )
            `
            )
            .in("chat_id", chatsId)
            .neq("profile_id", profile.id);

        if (error) {
            console.error(error);

            return null;
        }

        return data
            .map(({ chat_id, profiles, chats }) => {
                const message = chats.messages;

                return {
                    chatId: chat_id,
                    profile: profiles,
                    lastMessage: {
                        profileId: message.profile_id,
                        createdAt: new Date(message.created_at),
                        content: message.content,
                    },
                };
            })
            .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
    };

    const getChatMessages = async (chatId, signal) => {
        const { data, error } = await supabase
            .from("messages")
            .select()
            .eq("chat_id", chatId)
            .abortSignal(signal);

        if (error) {
            console.error(error);

            return null;
        }

        return groupMessages(
            data.map(message => ({ ...message, created_at: new Date(message.created_at) }))
        );
    };

    const removeLoadingScreen = (consumedTime = 0) => {
        setTimeout(
            () => setShowLoadingScreen(false),
            consumedTime < MIN_LOADING_SCREEN_TIME ? MIN_LOADING_SCREEN_TIME - consumedTime : 0
        );
    };

    useEffect(() => {
        const startTime = performance.now();

        supabase.auth.getSession().then(result => {
            const { data, error } = result;
            const { session } = data;

            if (error || !data.session) return removeLoadingScreen(performance.now() - startTime);

            fetchProfile(session).then(({ success }) => {
                if (success) setSession(session);

                removeLoadingScreen(performance.now() - startTime);
            });
        });

        supabase.auth.onAuthStateChange((_, changedSession) => {
            if (!changedSession) {
                setShowLoadingScreen(true);
                setSession(changedSession);
                removeLoadingScreen();
            }
        });
    }, []);

    return (
        <SupabaseContext.Provider
            value={{
                supabase,
                session,
                profile,
                showLoadingScreen,
                login,
                signUp,
                logout,
                searchQuery,
                getChats,
                getChatMessages,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
}
