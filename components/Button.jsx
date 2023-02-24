export default function Button({ type, disabled, className, onClick, children, big }) {
    return (
        <button
            {...Object.fromEntries(
                Object.entries({ type, disabled, onClick }).filter(([_, value]) => value != null)
            )}
            className={`w-full bg-background-500 uppercase text-secondary transition-colors duration-300 hover:bg-background-700 hover:text-primary ${
                big ? "p-4 text-sm font-bold" : "p-3 text-xs font-medium"
            }${className ? ` ${className}` : ""}`}
        >
            {children}
        </button>
    );
}
