"use client";

import { useContext } from "react";

import { SupabaseContext } from "context";
import { AuthForm } from "components";

export default function Index() {
    const { supabase, session } = useContext(SupabaseContext);

    return session ? (
        <>
            <h1 className="text-4xl font-black text-primary md:text-5xl">Supachat</h1>

            <button
                className="p-3 text-[#ededed] border-[1px] border-gray-500 bg-slate-700"
                onClick={() => supabase.auth.signOut()}
            >
                Log out
            </button>
        </>
    ) : (
        <AuthForm />
    );
}
