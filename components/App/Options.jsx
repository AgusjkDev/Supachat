import { useState } from "react";

import SvgButton from "./SvgButton";
import { Button } from "components";
import { svgs } from "data";

export default function Options({ options, small = false }) {
    const [showOptions, setShowOptions] = useState(false);

    const toggleShowOptions = () => setShowOptions(prevState => !prevState);

    return (
        <div className="relative">
            <SvgButton
                ariaLabel="Ver opciones"
                title="Opciones"
                onClick={toggleShowOptions}
                svg={svgs.options}
                small={small}
            />

            {showOptions && (
                <div
                    className={`absolute right-1/4 z-[1] w-36 bg-background-800 ${
                        small ? "top-8" : "top-10"
                    }`}
                >
                    {options.map(({ key, children, onClick }) => (
                        <Button
                            key={key}
                            onClick={e => {
                                e.stopPropagation();
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
