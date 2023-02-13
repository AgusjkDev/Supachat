"use client";

import { SupabaseProvider } from "context";

import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head />

            <body className="bg-background-900">
                <SupabaseProvider>{children}</SupabaseProvider>
            </body>
        </html>
    );
}
