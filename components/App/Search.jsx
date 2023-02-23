import Svg from "./Svg";
import ProfilePicture from "./ProfilePicture";
import { useQuery, useResults } from "hooks";
import { svgs } from "data";

export default function Search() {
    const { search, query, updateSearch } = useQuery();
    const { results, getResults } = useResults(query);

    const handleSubmit = e => {
        e.preventDefault();

        getResults.flush();
    };

    return (
        <div className="relative w-full lg:flex lg:flex-col lg:items-center">
            <form
                autoComplete="off"
                className="relative flex w-full items-center lg:w-4/5"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Buscar personas..."
                    className="w-full border-b-[1px] border-background-700 bg-background-900 p-4 pr-12 text-sm text-secondary placeholder:text-secondary-darker focus:outline focus:outline-2 focus:outline-background-800 lg:h-10 lg:rounded-sm lg:border-[1px] lg:py-0 lg:pr-10 lg:pl-2"
                    value={search}
                    onChange={e => updateSearch(e.target.value)}
                />

                <button
                    aria-label={search ? "Limpiar Búsqueda" : "Buscar"}
                    type={search ? "button" : "submit"}
                    className="group absolute right-0 mr-1 grid h-11 w-11 place-items-center lg:mr-0 lg:h-10 lg:w-10"
                    onClick={() => search && updateSearch("")}
                >
                    <Svg {...(search ? svgs.x : svgs.search)} />
                </button>
            </form>

            {results.length > 0 && (
                <div className="absolute min-h-[calc(100vh-77px-53px)] w-full border-b-[1px] border-background-700 bg-background-900 lg:top-10 lg:min-h-0 lg:w-4/5 lg:rounded-b-sm lg:border-x-[1px]">
                    {results.map(({ id, username, profile_picture, status }) => (
                        <button
                            key={id}
                            className="flex w-full justify-between border-b-[1px] border-b-background-700 p-4 pr-0 transition-colors duration-300 last:border-none hover:bg-background-800 lg:p-3.5 lg:pr-0"
                        >
                            <div className="flex gap-3">
                                <div className="h-11 w-11">
                                    <ProfilePicture
                                        username={username}
                                        profile_picture={profile_picture}
                                    />
                                </div>

                                <div className="flex flex-col items-start justify-evenly">
                                    <span className="text-sm font-medium text-secondary">
                                        {username}
                                    </span>

                                    <span className="text-xs text-secondary-dark">{status}</span>
                                </div>
                            </div>

                            <button
                                aria-label="Opciones"
                                className="group mr-1 grid h-11 w-11 place-items-center lg:hidden"
                            >
                                <Svg {...svgs.dots} />
                            </button>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
