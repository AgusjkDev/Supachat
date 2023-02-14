export default function FormButton({ form, activeForm, setActiveForm, children }) {
    const isActive = form == activeForm;

    return (
        <button
            className={`flex-1 rounded-r-sm p-3.5 font-medium text-secondary ${
                isActive
                    ? "bg-background-700"
                    : "bg-background-500 transition-colors duration-300 hover:bg-background-700 hover:text-primary"
            }`}
            disabled={isActive}
            onClick={() => setActiveForm(form)}
        >
            {children}
        </button>
    );
}
