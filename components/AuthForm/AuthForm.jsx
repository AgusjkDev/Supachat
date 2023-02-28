import { FormButton, FormField } from "components/AuthForm";
import { Spinner, Button } from "components";
import { useAuthForm } from "hooks";
import { authForms } from "data";

export default function AuthForm() {
    const {
        activeForm,
        isSubmitting,
        isSignupForm,
        errorMessage,
        formRef,
        updateActiveForm,
        handleSubmit,
    } = useAuthForm();

    return (
        <div className="grid min-h-screen w-full place-items-center py-8">
            <main className="flex w-[90%] max-w-lg flex-col gap-8 rounded-sm bg-background-800 py-8 px-6 sm:px-8 md:max-w-xl 2xl:max-w-2xl 2xl:p-10">
                <h1 className="text-center text-3xl font-black text-primary md:text-4xl">
                    Supachat
                </h1>

                <div className="flex w-full">
                    <FormButton
                        form="login"
                        activeForm={activeForm}
                        isSubmitting={isSubmitting}
                        updateActiveForm={updateActiveForm}
                    >
                        Iniciar Sesión
                    </FormButton>

                    <FormButton
                        form="signup"
                        activeForm={activeForm}
                        isSubmitting={isSubmitting}
                        updateActiveForm={updateActiveForm}
                    >
                        Registrarse
                    </FormButton>
                </div>

                <form
                    ref={formRef}
                    autoComplete="off"
                    className="flex w-full flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    {errorMessage && (
                        <span className="rounded-sm bg-red-700 p-2 text-center text-sm font-medium text-secondary">
                            {errorMessage}
                        </span>
                    )}

                    {authForms[activeForm].map(field => (
                        <FormField key={field.name} isSubmitting={isSubmitting} {...field} />
                    ))}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-4 flex justify-center rounded-sm${
                            isSubmitting ? " bg-background-700 hover:cursor-not-allowed" : ""
                        }`}
                        big
                    >
                        {isSubmitting ? (
                            <Spinner />
                        ) : isSignupForm ? (
                            "Registrarse"
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>
            </main>
        </div>
    );
}
