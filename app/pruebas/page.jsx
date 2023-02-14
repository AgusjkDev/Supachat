"use client";

import { useState, useEffect, useContext } from "react";

import { SupabaseContext } from "context";

export default function Pruebas() {
    const { supabase, session, profile } = useContext(SupabaseContext);
    const [messages, setMessages] = useState([]);

    const chat_id = "3bec696d-7a2c-4220-a067-c5afb5b53a50";

    const handleSubmit = async e => {
        e.preventDefault();

        const { message } = Object.fromEntries(new FormData(e.target));
        if (!message) {
            return alert("message vacio");
        }
        console.log({ content: message, profile_id: profile.id, chat_id });
        await supabase
            .from("messages")
            .insert({ content: message, profile_id: profile.id, chat_id });
    };

    const useEffectContent = async () => {
        console.log({ session, profile, supabase });
        if (!session || !profile) return console.log("returning");

        console.log("useEffect");

        const { data, error } = await supabase
            .from("chat_participants")
            .select("*")
            .eq("profile_id", profile.id);

        if (error) {
            return alert(JSON.stringify({ error }));
        }

        const chats_ids = data.map(({ chat_id }) => chat_id);
        const filter = `chat_id=in.(${chats_ids.join(",")})`;
        console.log({ filter });

        try {
            const channel = supabase
                .channel("*")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "messages",
                        filter,
                    },
                    payload => {
                        alert(JSON.stringify(payload.new, null, 4));
                    }
                )
                .subscribe(status => alert(status));

            return () => {
                console.log({ msg: "removing channel", channel });
                supabase.removeChannel(channel);
            };
        } catch (e) {
            alert(JSON.stringify({ e }));
        }
    };

    useEffect(() => {
        useEffectContent();
    }, [session, profile]);

    return (
        <div className="grid w-full min-h-screen place-items-center">
            <form
                onSubmit={handleSubmit}
                className="p-8 bg-blue-700 flex flex-col gap-8 max-w-[300px]"
            >
                <input
                    name="message"
                    type="text"
                    placeholder="Tu mensaje"
                    className="p-3 bg-background-700 text-secondary placeholder:text-secondary-dark"
                />

                <button type="submit" className="p-3 bg-background-700 text-secondary">
                    Enviar
                </button>
            </form>
        </div>
    );
}
