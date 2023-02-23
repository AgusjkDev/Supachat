import { useContext, useState } from "react";

import { SupabaseContext } from "context";
import Svg from "./Svg";
import { svgs } from "data";

export default function Options() {
    const { logout } = useContext(SupabaseContext);
    const [showOptions, setShowOptions] = useState(false);

    return (
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
    );
}
