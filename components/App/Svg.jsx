export default function Svg({ viewBox, path }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            className="h-7 w-7 fill-secondary transition-colors duration-300 group-hover:fill-primary lg:h-6 lg:w-6"
        >
            <path d={path} />
        </svg>
    );
}
