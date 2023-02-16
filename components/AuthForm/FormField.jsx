export default function FormField({ name, label, type, placeholder, isSubmitting }) {
    return (
        <div key={name} className="flex w-full flex-col gap-1.5">
            <label htmlFor={name} className="font-medium text-secondary">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={isSubmitting}
                className={`w-full rounded-sm bg-background-600 p-4 text-sm text-secondary placeholder:text-secondary-dark focus:outline focus:outline-2 focus:outline-background-900${
                    isSubmitting ? " blur-[2px] hover:cursor-not-allowed" : ""
                }`}
            />
        </div>
    );
}
