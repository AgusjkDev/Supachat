import { useState, useCallback, useEffect } from "react";

export default function useOptions() {
    const [showOptions, setShowOptions] = useState(false);

    const toggleShowOptions = () => setShowOptions(prevState => !prevState);

    const handleOutsideClick = useCallback(() => {
        setTimeout(() => setShowOptions(false), 1);
    }, []);

    useEffect(() => {
        if (!showOptions) return;

        document.documentElement.addEventListener("click", handleOutsideClick);

        return () => document.documentElement.removeEventListener("click", handleOutsideClick);
    }, [showOptions]);

    return { showOptions, toggleShowOptions };
}
