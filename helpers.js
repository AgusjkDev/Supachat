import { regex } from "data";

export const reduceSpaces = str => str.replace(regex.removeExtraSpaces, " ").trim();

export const formatDate = (dateString, isChatTimestamp = false) => {
    const date = new Date(dateString);
    const hourFormat = {
        hour: "2-digit",
        minute: "2-digit",
    };
    const dateFormat = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    const fullFormat = { ...hourFormat, ...dateFormat };

    if (isChatTimestamp) {
        const diffMs = Date.now() - date.getTime();
        const isYesterday = diffMs < 2 * 24 * 60 * 60 * 1000;
        const isToday = diffMs < 24 * 60 * 60 * 1000;

        if (!isToday && isYesterday) return "Ayer";

        return Intl.DateTimeFormat("es", isToday ? hourFormat : dateFormat).format(date);
    }

    return Intl.DateTimeFormat("es", fullFormat).format(date);
};
