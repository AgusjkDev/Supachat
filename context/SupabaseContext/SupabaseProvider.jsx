import { useState, useEffect } from "react";

import SupabaseContext from "./SupabaseContext";

import supabase from "utils/supabase";
import { groupMessages } from "helpers";
import { IS_DEVELOPMENT_MODE, MIN_LOADING_SCREEN_TIME } from "constants";

export default function SupabaseProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);

    const fetchProfile = async newSession => {
        const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", newSession.user.id)
            .single();

        if (error) return { success: false, error };

        setProfile({ ...data, created_at: new Date(data.created_at) });

        return { success: true };
    };

    const insertProfile = async profile => {
        const { data, error } = await supabase
            .from("profiles")
            .insert({ ...profile })
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

        const { success, error: insertError } = await insertProfile({ username });
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
            .neq("id", profile.id)
            .ilike("username", `${query}%`);

        if (error) {
            if (IS_DEVELOPMENT_MODE) console.error(error);

            return;
        }

        return data.map(result => ({ ...result, created_at: new Date(result.created_at) }));
    };

    const getChats = async () => {
        const { data, error } = await supabase.rpc("get_profile_chats", {
            p_id: profile.id,
        });

        if (error) {
            if (IS_DEVELOPMENT_MODE) console.error(error);

            return;
        }

        return data.map(chat => ({
            ...chat,
            profile: { ...chat.profile, created_at: new Date(chat.profile.created_at) },
        }));
    };

    const getChatMessages = async (chatId, signal) => {
        const { data, error } = await supabase
            .from("messages")
            .select()
            .eq("chat_id", chatId)
            .abortSignal(signal);

        if (error) {
            if (IS_DEVELOPMENT_MODE) console.error(error);

            return;
        }

        return groupMessages(
            data.map(message => ({ ...message, created_at: new Date(message.created_at) }))
        );
    };

    const sendMessageToChat = async (chat, message) => {
        const { data, error } = await supabase
            .from("messages")
            .insert({ content: message, profile_id: profile.id, chat_id: chat.chat_id })
            .select()
            .single();

        if (error) {
            if (IS_DEVELOPMENT_MODE) console.error(error);

            return;
        }

        return groupMessages([
            ...chat.messages.flatMap(msg => msg),
            { ...data, created_at: new Date(data.created_at) },
        ]);
    };

    const createChatAndSendMessage = async (chatterProfile, message) => {
        const { data, error } = await supabase.rpc("create_chat_and_send_message", {
            profile_id: profile.id,
            chatter_profile_id: chatterProfile.id,
            message,
        });

        if (error) {
            if (IS_DEVELOPMENT_MODE) console.error(error);

            return;
        }

        return {
            chat_id: data.chat_id,
            profile: chatterProfile,
            messages: groupMessages([
                {
                    ...data,
                    created_at: new Date(data.created_at),
                    profile_id: profile.id,
                },
            ]),
        };
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
                sendMessageToChat,
                createChatAndSendMessage,
            }}
        >
            {children}
        </SupabaseContext.Provider>
    );
}
