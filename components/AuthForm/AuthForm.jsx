import { useContext, useState, useEffect } from "react";

import { SupabaseContext } from "context";
import FormButton from "./FormButton";
import FormField from "./FormField";
import { authForms } from "data";

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

        if (activeForm === "signup" && fields.password !== fields.confirmPassword) {
            return setErrorMessage("¡Las contraseñas no coinciden!");
        }

        const authFunction = activeForm === "login" ? login : signUp;
        const authFunctionParams = Object.values({
            ...fields,
            ...(activeForm === "signup" && { confirmPassword: undefined }),
        });

        const { success, error } = await authFunction(...authFunctionParams);
        if (success) return;

        return setErrorMessage(error);
    };

    useEffect(() => {
        if (!errorMessage) return;

        setErrorMessage("");
    }, [activeForm]);

    return (
        <div className="min-h-screen grid place-items-center w-full">
            <main className="flex max-w-lg md:max-w-xl 2xl:max-w-2xl sm:px-8 2xl:p-10 flex-col w-[90%] gap-8 bg-background-800 rounded-sm py-8 px-6">
                <h1 className="text-3xl text-center font-black text-primary md:text-4xl">
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
                    className="flex flex-col w-full gap-5"
                    onSubmit={handleSubmit}
                >
                    {errorMessage && (
                        <span className="p-1.5 bg-red-700 text-secondary rounded-sm text-center text-sm font-medium">
                            {errorMessage}
                        </span>
                    )}

                    {authForms[activeForm].map(field => (
                        <FormField key={field.name} {...field} />
                    ))}

                    <button
                        type="submit"
                        className="mt-4 transition-colors duration-300 hover:bg-background-700 hover:text-primary w-full p-4 font-bold text-secondary text-sm uppercase rounded-sm bg-background-500"
                    >
                        {activeForm === "login" ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>
            </main>
        </div>
    );
}
