const authForms = {
    login: [
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
    ],
    signup: [
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
    ],
};

export default authForms;
