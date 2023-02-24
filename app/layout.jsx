"use client";

import { SupabaseProvider, AppProvider } from "context";

import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head />

            <body>
                <SupabaseProvider>
                    <AppProvider>{children}</AppProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
