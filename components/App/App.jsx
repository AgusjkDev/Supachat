import { useContext } from "react";

import { SupabaseContext } from "context";
import Svg from "./Svg";
import ProfilePicture from "./ProfilePicture";
import Options from "./Options";
import Search from "./Search";
import Chats from "./Chats";
import { svgs } from "data";

export default function App() {
    const { profile } = useContext(SupabaseContext);

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

                    <h2 className="text-center font-bold text-primary">{profile.username}</h2>

                    <Options />
                </header>

                <div className="sticky top-0 lg:hidden">
                    <Search />
                </div>

                <div className="max-h-[calc(100vh-77px-53px)] min-h-[calc(100vh-77px-53px)] overflow-y-auto lg:max-h-[calc(100vh-65px)] lg:min-h-[calc(100vh-65px)]">
                    <Chats />
                </div>
            </div>

            {/* Hidden on smaller devices */}
            <div className="hidden flex-[4] flex-col lg:flex">
                <header className="grid grid-cols-3 place-items-center border-b-[1px] border-b-background-700 py-3">
                    <Search />

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
