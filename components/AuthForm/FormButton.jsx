export default function FormButton({ form, activeForm, setActiveForm, children }) {
    const isActive = form == activeForm;

    return (
        <button
            className={`flex-1 p-3.5 rounded-r-sm text-secondary font-medium ${
                isActive
                    ? "bg-background-700"
                    : "bg-background-500 hover:bg-background-700 hover:text-primary transition-colors duration-300"
            }`}
            disabled={isActive}
            onClick={() => setActiveForm(form)}
        >
            {children}
        </button>
    );
}
