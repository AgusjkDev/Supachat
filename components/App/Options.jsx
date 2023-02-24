import { useContext } from "react";

import { SupabaseContext, AppContext } from "context";
import SvgButton from "./SvgButton";
import { Button } from "components";
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
                    <Button onClick={logout}>Cerrar Sesión</Button>
                </div>
            )}
        </div>
    );
}
