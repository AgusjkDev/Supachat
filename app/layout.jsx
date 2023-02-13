"use client";

import { SupabaseProvider } from "context";

import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head />

            <body className="grid w-full min-h-screen place-items-center">
                <SupabaseProvider>{children}</SupabaseProvider>
            </body>
        </html>
    );
}
