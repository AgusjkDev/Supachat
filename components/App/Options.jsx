import { useContext } from "react";

import { SupabaseContext, AppContext } from "context";
import SvgButton from "./SvgButton";
import { svgs } from "data";

export default function Options() {
    const { logout } = useContext(SupabaseContext);
    const { showOptions, toggleShowOptions } = useContext(AppContext);

    return (
        <div className="relative">
            <SvgButton
                ariaLabel="Ver opciones"
                title="Opciones"
                onClick={toggleShowOptions}
                svg={svgs.options}
            />

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
