import { useContext, useState, useRef, useEffect } from "react";

import { SupabaseContext } from "context";
import { regex } from "data";
import { reduceSpaces } from "helpers";

export default function useAuthForm() {
    const { login, signUp } = useContext(SupabaseContext);
    const [activeForm, setActiveForm] = useState("login");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const formRef = useRef();

    const isSignupForm = activeForm === "signup";

    const handleSubmit = async e => {
        e.preventDefault();

        if (errorMessage) setErrorMessage("");

        const fields = Object.fromEntries(new FormData(e.target));
        if (Object.values(fields).some(field => !field)) {
            return setErrorMessage("¡Todos los campos son obligatorios!");
        }

        const { username, email, password, confirmPassword } = fields;

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

        setIsSubmitting(true);

        const authFunction = isSignupForm ? signUp : login;

        const { error } = await authFunction(
            ...(isSignupForm ? [cleanUsername, cleanEmail, password] : [cleanEmail, password])
        );

        if (error) {
            formRef.current.reset();

            return setErrorMessage(error);
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        if (!errorMessage) return;

        setErrorMessage("");
    }, [activeForm]);

    useEffect(() => {
        if (!errorMessage) return;

        setIsSubmitting(false);
    }, [errorMessage]);

    return {
        activeForm,
        isSubmitting,
        isSignupForm,
        errorMessage,
        formRef,
        updateActiveForm: setActiveForm,
        handleSubmit,
    };
}
