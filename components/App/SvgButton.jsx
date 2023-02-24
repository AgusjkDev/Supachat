export default function SvgButton({ ariaLabel, title, type, className, onClick, svg }) {
    return (
        <button
            aria-label={ariaLabel}
            title={title}
            {...(type && { type })}
            className={`group grid h-8 w-8 place-items-center${className ? ` ${className}` : ""}`}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={svg.viewBox}
                className="h-6 w-6 fill-secondary-dark transition-colors duration-300 group-hover:fill-primary"
            >
                <path d={svg.path} />
            </svg>
        </button>
    );
}
