import { regex, diacriticChars } from "data";

export const reduceSpaces = str => str.replace(regex.removeExtraSpaces, " ").trim();

export const sanitizeQuery = str =>
    str.replace(regex.sanitizeQuery, c => diacriticChars[c] || "").trim();

export const formatDate = (date, format) => {
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

    const diffMs = Date.now() - date.getTime();
    const isYesterday = diffMs < 2 * 24 * 60 * 60 * 1000;
    const isToday = diffMs < 24 * 60 * 60 * 1000;

    switch (format) {
        case "chat":
            if (!isToday && isYesterday) return "Ayer";

            return Intl.DateTimeFormat("es", isToday ? hourFormat : dateFormat).format(date);

        case "message":
            return Intl.DateTimeFormat("es", isToday ? hourFormat : dateFormat).format(date);

        default:
            return Intl.DateTimeFormat("es", fullFormat).format(date);
    }
};

export const groupMessages = messages => {
    const groupedMessages = messages.reduce((acc, message) => {
        const lastGroup = acc[acc.length - 1];
        const lastMessage = lastGroup && lastGroup[lastGroup.length - 1];

        if (lastMessage && lastMessage.profile_id === message.profile_id) {
            lastGroup.push(message);
        } else {
            acc.push([message]);
        }

        return acc;
    }, []);

    return groupedMessages;
};
