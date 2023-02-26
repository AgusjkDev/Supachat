import { useState } from "react";

import SvgButton from "./SvgButton";
import { Button } from "components";
import { svgs } from "data";

export default function Options({ options }) {
    const [showOptions, setShowOptions] = useState(false);

    const toggleShowOptions = () => setShowOptions(prevState => !prevState);

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
                    {options.map(({ key, children, onClick }) => (
                        <Button
                            key={key}
                            onClick={() => {
                                onClick();
                                toggleShowOptions();
                            }}
                        >
                            {children}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
