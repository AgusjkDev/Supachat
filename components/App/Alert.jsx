import { svgs } from "data";

export default function Alert({ alert, hideAlert }) {
    return (
        <button
            className="group fixed bottom-4 right-4 flex items-center gap-2.5 rounded-sm border-[1px] border-background-700 bg-background-900 p-4 transition-colors duration-300 hover:border-background-600 hover:bg-background-800 lg:bottom-auto lg:top-4 lg:p-3.5"
            onClick={hideAlert}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={svgs.danger.viewBox}
                className="h-6 w-6 fill-transparent stroke-red-600/75 stroke-2 transition-colors duration-300 group-hover:stroke-red-600"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={svgs.danger.path} />
            </svg>

            <span className="max-w-[260px] text-sm text-secondary-dark">{alert}</span>
        </button>
    );
}
