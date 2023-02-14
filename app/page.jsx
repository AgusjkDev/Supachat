"use client";

import { useContext } from "react";

import { SupabaseContext } from "context";
import { AuthForm, App } from "components";

export default function Index() {
    const { session, profile } = useContext(SupabaseContext);

    return session && profile ? <App /> : <AuthForm />;
}
