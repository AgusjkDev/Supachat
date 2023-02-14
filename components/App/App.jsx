import { useContext, useState } from "react";

import { SupabaseContext } from "context";
import Svg from "./Svg";
import ProfilePicture from "./ProfilePicture";
import { svgs } from "data";

export default function App() {
    const { profile, logout } = useContext(SupabaseContext);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <>
            <div className="flex w-full flex-col lg:max-w-md lg:flex-[2] lg:border-r-[1px] lg:border-r-background-700">
                <header className="flex w-full items-center justify-around border-b-[1px] border-b-background-700 py-4 lg:py-3">
                    <button
                        aria-label="Ver Perfil"
                        className="h-11 w-11 rounded-full border-2 border-transparent transition-colors duration-300 hover:border-primary lg:h-10 lg:w-10"
                    >
                        <ProfilePicture {...profile} />
                    </button>

                    {/* Hidden on larger devices */}
                    <h2 className="text-center text-xl font-black text-primary lg:hidden">
                        Supachat
                    </h2>

                    {/* Hidden on smaller devices */}
                    <h2 className="hidden text-center font-bold text-primary lg:block">
                        {profile.username}
                    </h2>

                    <div className="relative">
                        <button
                            aria-label="Opciones"
                            className="group grid h-11 w-11 place-items-center lg:h-10 lg:w-10"
                            onClick={() => setShowOptions(prevState => !prevState)}
                        >
                            <Svg {...svgs.dots} />
                        </button>

                        {showOptions && (
                            <div className="absolute top-10 right-1/4 z-[1] w-36 bg-background-800">
                                <button
                                    className="w-full bg-background-500 p-3 text-xs font-medium uppercase text-secondary transition-colors duration-300 hover:bg-background-700 hover:text-primary"
                                    onClick={logout}
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="max-h-[calc(100vh-77px)] overflow-y-auto lg:max-h-[calc(100vh-65px)]"></div>
            </div>

            {/* Hidden on smaller devices */}
            <div className="hidden flex-[4] flex-col lg:flex">
                <header className="grid grid-cols-3 place-items-center border-b-[1px] border-b-background-700 py-3">
                    <form
                        autoComplete="off"
                        className="relative flex w-4/5"
                        onSubmit={e => e.preventDefault()}
                    >
                        <input
                            name="search"
                            type="text"
                            placeholder="Buscar personas..."
                            className="h-10 w-full rounded-sm border-[1px] border-background-700 bg-background-900 pr-10 pl-2 text-sm text-secondary placeholder:text-secondary-darker focus:outline focus:outline-2 focus:outline-background-800"
                        />

                        <button
                            aria-label="Buscar Personas"
                            className="group absolute right-0 grid h-10 w-10 place-items-center"
                        >
                            <Svg {...svgs.search} />
                        </button>
                    </form>

                    <h1 className="text-center text-lg font-black text-primary">Supachat</h1>

                    <div className="flex w-4/5 justify-end">
                        <button
                            aria-label="Cambiar Tema"
                            className="group grid h-10 w-10 place-items-center"
                        >
                            <Svg {...svgs.theme} />
                        </button>
                    </div>
                </header>

                <div className="max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] overflow-y-auto"></div>
            </div>
        </>
    );
}
