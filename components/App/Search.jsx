import Svg from "./Svg";
import ProfilePicture from "./ProfilePicture";
import { useQuery, useResults } from "hooks";
import { svgs } from "data";

export default function Search() {
    const { query, updateQuery } = useQuery();
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
                    onChange={e => updateQuery(e.target.value)}
                />

                <button
                    type="submit"
                    className="group absolute right-0 mr-1 grid h-11 w-11 place-items-center lg:mr-0 lg:h-10 lg:w-10"
                >
                    <Svg {...svgs.search} />
                </button>
            </form>

            {results.length > 0 && (
                <div className="absolute w-full border-b-[1px] border-background-700 lg:top-10 lg:w-4/5 lg:rounded-b-sm lg:border-x-[1px]">
                    {results.map(({ id, username, profile_picture }) => (
                        <button
                            key={id}
                            className="flex w-full items-center gap-3.5 border-b-[1px] border-b-background-700 bg-background-900 p-4 transition-colors duration-300 last:border-none hover:bg-background-800 lg:p-3"
                            onClick={e => console.log(e.currentTarget)}
                        >
                            <div className="h-9 w-9">
                                <ProfilePicture
                                    username={username}
                                    profile_picture={profile_picture}
                                />
                            </div>

                            <span className="text-center text-sm font-medium text-secondary">
                                {username}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
