import Svg from "./Svg";
import { svgs } from "data";

export default function Search() {
    return (
        <form
            autoComplete="off"
            className="relative flex w-full items-center lg:w-4/5"
            onSubmit={e => e.preventDefault()}
        >
            <input
                name="search"
                type="text"
                placeholder="Buscar personas..."
                className="w-full border-b-[1px] border-background-700 bg-background-900 p-4 pr-12 text-sm text-secondary placeholder:text-secondary-darker focus:outline focus:outline-2 focus:outline-background-800 lg:h-10 lg:rounded-sm lg:border-[1px] lg:py-0 lg:pr-10 lg:pl-2"
            />

            <button
                aria-label="Buscar Personas"
                type="submit"
                className="group absolute right-0 mr-1 grid h-11 w-11 place-items-center lg:mr-0 lg:h-10 lg:w-10"
            >
                <Svg {...svgs.search} />
            </button>
        </form>
    );
}
