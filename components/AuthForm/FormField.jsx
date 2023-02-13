export default function FormField({ name, label, type, placeholder }) {
    return (
        <div key={name} className="flex flex-col w-full gap-1.5">
            <label htmlFor={name} className="text-secondary font-medium">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className="w-full rounded-sm bg-background-600 text-secondary p-4 text-sm placeholder:text-secondary-dark focus:outline-2 focus:outline focus:outline-background-900"
            />
        </div>
    );
}
