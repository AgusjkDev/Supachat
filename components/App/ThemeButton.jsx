import SvgButton from "./SvgButton";
import { svgs } from "data";

export default function ThemeButton() {
    const handleTheme = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <SvgButton
            ariaLabel="Cambiar tema visual"
            title="Tema"
            onClick={handleTheme}
            svg={svgs.theme}
        />
    );
}
