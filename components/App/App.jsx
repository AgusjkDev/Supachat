import { useContext } from "react";

import { SupabaseContext } from "context";
import Svg from "./Svg";
import ProfilePicture from "./ProfilePicture";
import { svgs } from "data";

export default function App() {
    const { profile } = useContext(SupabaseContext);

    return (
        <div className="flex bg-background-900">
            <div className="lg:max-w-md w-full flex flex-col lg:flex-[2] lg:border-r-[1px] lg:border-r-background-700">
                <header className="lg:py-3 border-b-background-700 border-b-[1px] flex w-full py-4 justify-around items-center">
                    <button
                        aria-label="Ver Perfil"
                        className="border-2 w-11 h-11 lg:w-10 lg:h-10 rounded-full hover:border-primary border-transparent transition-colors duration-300"
                    >
                        <ProfilePicture {...profile} />
                    </button>

                    {/* Hidden on larger devices */}
                    <h2 className="text-xl font-black text-center text-primary lg:hidden">
                        Supachat
                    </h2>

                    {/* Hidden on smaller devices */}
                    <h2 className="hidden font-bold text-center text-primary lg:block">
                        {profile.username}
                    </h2>

                    <button
                        aria-label="Opciones"
                        className="grid w-11 group lg:w-10 lg:h-10 h-11 place-items-center"
                    >
                        <Svg {...svgs.dots} />
                    </button>
                </header>

                <div className="max-h-[calc(100vh-77px)] lg:max-h-[calc(100vh-65px)] overflow-y-auto"></div>
            </div>

            {/* Hidden on smaller devices */}
            <div className="lg:flex flex-col hidden flex-[4]">
                <header className="grid grid-cols-3 place-items-center py-3 border-b-background-700 border-b-[1px]">
                    <form className="relative flex w-4/5" onSubmit={e => e.preventDefault()}>
                        <input
                            name="search"
                            type="text"
                            placeholder="Buscar personas..."
                            className="bg-background-900 pr-10 w-full rounded-sm pl-2 h-10 text-sm focus:outline-2 focus:outline focus:outline-background-800 placeholder:text-secondary-darker text-secondary border-[1px] border-background-700"
                        />

                        <button
                            aria-label="Buscar Personas"
                            className="absolute right-0 grid w-10 h-10 group place-items-center"
                        >
                            <Svg {...svgs.search} />
                        </button>
                    </form>

                    <h1 className="text-lg font-black text-center text-primary">Supachat</h1>

                    <div className="flex justify-end w-4/5">
                        <button
                            aria-label="Cambiar Tema"
                            className="grid w-10 h-10 group place-items-center"
                        >
                            <Svg {...svgs.theme} />
                        </button>
                    </div>
                </header>

                <div className="max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] overflow-y-auto"></div>
            </div>
        </div>
    );
}
