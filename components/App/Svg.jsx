export default function Svg({ viewBox, path }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            className="lg:w-6 w-7 h-7 lg:h-6 fill-secondary group-hover:fill-primary transition-colors duration-300"
        >
            <path d={path} />
        </svg>
    );
}
