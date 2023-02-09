import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head />

            <body className="grid w-full min-h-screen place-items-center">{children}</body>
        </html>
    );
}
