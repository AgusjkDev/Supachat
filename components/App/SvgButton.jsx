export default function SvgButton({
    ariaLabel,
    title,
    type,
    className,
    onClick,
    svg,
    small = false,
}) {
    const handleClick = e => {
        e.stopPropagation();
        onClick();
    };

    return (
        <button
            aria-label={ariaLabel}
            title={title}
            {...(type && { type })}
            className={`group/svg grid place-items-center${className ? ` ${className}` : ""} ${
                small ? "h-7 w-7" : "h-8 w-8"
            }`}
            onClick={handleClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={svg.viewBox}
                className={`fill-secondary-dark transition-colors duration-300 group-hover/svg:fill-primary ${
                    small ? "h-5 w-5" : "h-6 w-6"
                }`}
            >
                <path d={svg.path} />
            </svg>
        </button>
    );
}
