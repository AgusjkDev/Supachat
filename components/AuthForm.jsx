import { useContext, useState } from "react";

import { SupabaseContext } from "context";

const loginForm = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Dirección de email",
    },
    {
        name: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "Contraseña",
    },
];

const signUpForm = [
    {
        name: "username",
        label: "Usuario",
        type: "text",
        placeholder: "Nombre de usuario",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Dirección de email",
    },
    {
        name: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "Contraseña",
    },
    {
        name: "confirmPassword",
        label: "Confirmar contraseña",
        type: "password",
        placeholder: "Confirmar contraseña",
    },
];

export default function AuthForm() {
    const { login, signUp } = useContext(SupabaseContext);
    const [form, setForm] = useState("login");

    const handleSubmit = e => {
        e.preventDefault();

        const fields = Object.fromEntries(new FormData(e.target));
        if (Object.values(fields).some(field => !field)) {
            return console.error("Hay campos vacíos");
        }

        if (form === "signup" && fields.password !== fields.confirmPassword) {
            return console.error("Las contraseñas no coinciden");
        }

        if (form === "login") {
            return login(...Object.values(fields));
        }

        signUp(...Object.values({ ...fields, confirmPassword: undefined }));
    };

    return (
        <main className="flex flex-col w-[90%] gap-4 p-6 bg-slate-700">
            <div className="flex w-full">
                <button
                    className="flex-1 p-3 text-[#ededed] border-[1px] border-gray-500"
                    onClick={() => setForm("login")}
                >
                    Log in
                </button>

                <button
                    className="flex-1 p-3 text-[#ededed] border-[1px] border-gray-500"
                    onClick={() => setForm("signup")}
                >
                    Sign Up
                </button>
            </div>

            <form autoComplete="off" className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
                {(form === "login" ? loginForm : signUpForm).map(
                    ({ name, label, type, placeholder }) => (
                        <div key={name} className="flex flex-col w-full gap-1">
                            <label htmlFor={name} className="text-lg text-[#ededed] font-semibold">
                                {label}
                            </label>

                            <input
                                id={name}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                className="w-full p-2"
                            />
                        </div>
                    )
                )}

                <button
                    type="submit"
                    className="w-full p-3 font-bold text-white uppercase rounded-sm bg-slate-600"
                >
                    {form === "login" ? "Iniciar Sesión" : "Registrarse"}
                </button>
            </form>
        </main>
    );
}
