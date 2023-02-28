export default function FormButton({ form, activeForm, isSubmitting, updateActiveForm, children }) {
    const isActive = form == activeForm;

    return (
        <button
            disabled={isActive || isSubmitting}
            className={`flex-1 rounded-r-sm p-3.5 font-medium text-secondary ${
                isActive
                    ? "bg-background-700"
                    : `bg-background-500${
                          !isSubmitting
                              ? " transition-colors duration-300 hover:bg-background-700 hover:text-primary"
                              : ""
                      }${isSubmitting ? " hover:cursor-not-allowed" : ""}`
            }`}
            onClick={() => updateActiveForm(form)}
        >
            {children}
        </button>
    );
}
