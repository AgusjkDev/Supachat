import { SvgButton } from "components/App";
import { svgs } from "data";

export default function Search({ search, updateSearch, getResults }) {
    const handleSubmit = e => {
        e.preventDefault();

        getResults.flush();
    };

    return (
        <form autoComplete="off" className="relative flex items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar personas..."
                className="w-full border-b-[1px] border-background-700 bg-background-900 py-4 pl-3.5 pr-12 text-sm text-secondary placeholder:text-secondary-darker focus:outline focus:outline-2 focus:outline-background-800"
                value={search}
                onChange={e => updateSearch(e.target.value)}
            />

            <SvgButton
                aria-label={search ? "Limpiar búsqueda" : "Buscar personas"}
                title={search ? "Limpiar" : "Buscar"}
                type={search ? "button" : "submit"}
                className="absolute right-0 mr-3.5"
                onClick={() => search && updateSearch("")}
                svg={search ? svgs.x : svgs.search}
            />
        </form>
    );
}
