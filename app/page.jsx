"use client";

import { useContext } from "react";

import { SupabaseContext } from "context";
import { LoadingScreen, AuthForm, App } from "components";

export default function Index() {
    const { session, profile, showLoadingScreen } = useContext(SupabaseContext);

    return showLoadingScreen ? <LoadingScreen /> : session && profile ? <App /> : <AuthForm />;
}
