import { SvgButton } from "components/App";
import { Button } from "components";
import { useOptions } from "hooks";
import { svgs } from "data";

export default function Options({ options, hiddenUntilHover = false, small = false }) {
    const { showOptions, toggleShowOptions } = useOptions();

    return (
        <div className="relative">
            <SvgButton
                ariaLabel="Ver opciones"
                title="Opciones"
                {...(hiddenUntilHover && {
                    className:
                        "lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100",
                })}
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
