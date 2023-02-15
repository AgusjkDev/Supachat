import { useContext, useState, useEffect } from "react";

import { SupabaseContext } from "context";
import FormButton from "./FormButton";
import FormField from "./FormField";
import { authForms, regex } from "data";
import { reduceSpaces } from "helpers";

export default function AuthForm() {
    const { login, signUp } = useContext(SupabaseContext);
    const [activeForm, setActiveForm] = useState("login");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        const fields = Object.fromEntries(new FormData(e.target));
        if (Object.values(fields).some(field => !field)) {
            return setErrorMessage("¡Todos los campos son obligatorios!");
        }

        const { username, email, password, confirmPassword } = fields;
        const isSignupForm = activeForm === "signup";

        const cleanUsername = isSignupForm ? reduceSpaces(username) : undefined;
        if (isSignupForm && !regex.username.test(cleanUsername)) {
            return setErrorMessage(
                "¡El nombre de usuario debe tener al menos 3 carácteres, solo letras, números, puntos y guión bajo!"
            );
        }

        const cleanEmail = reduceSpaces(email);
        if (!regex.email.test(cleanEmail)) {
            return setErrorMessage("¡Dirección de email inválida!");
        }

        if (!regex.password.test(password)) {
            return setErrorMessage(
                "¡La contraseña debe tener al menos 8 carácteres, una minúscula, una mayúscula, un número y un símbolo!"
            );
        }

        if (isSignupForm && password !== confirmPassword) {
            return setErrorMessage("¡Las contraseñas no coinciden!");
        }

        const authFunction = isSignupForm ? signUp : login;

        const { error } = await authFunction(
            ...(isSignupForm ? [cleanUsername, cleanEmail, password] : [cleanEmail, password])
        );

        if (error) return setErrorMessage(error);
    };

    useEffect(() => {
        if (!errorMessage) return;

        setErrorMessage("");
    }, [activeForm]);

    return (
        <div className="grid min-h-screen w-full place-items-center">
            <main className="flex w-[90%] max-w-lg flex-col gap-8 rounded-sm bg-background-800 py-8 px-6 sm:px-8 md:max-w-xl 2xl:max-w-2xl 2xl:p-10">
                <h1 className="text-center text-3xl font-black text-primary md:text-4xl">
                    Supachat
                </h1>

                <div className="flex w-full">
                    <FormButton form="login" activeForm={activeForm} setActiveForm={setActiveForm}>
                        Iniciar Sesión
                    </FormButton>

                    <FormButton form="signup" activeForm={activeForm} setActiveForm={setActiveForm}>
                        Registrarse
                    </FormButton>
                </div>

                <form
                    autoComplete="off"
                    className="flex w-full flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    {errorMessage && (
                        <span className="rounded-sm bg-red-700 p-1.5 text-center text-sm font-medium text-secondary">
                            {errorMessage}
                        </span>
                    )}

                    {authForms[activeForm].map(field => (
                        <FormField key={field.name} {...field} />
                    ))}

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-sm bg-background-500 p-4 text-sm font-bold uppercase text-secondary transition-colors duration-300 hover:bg-background-700 hover:text-primary"
                    >
                        {activeForm === "login" ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>
            </main>
        </div>
    );
}
