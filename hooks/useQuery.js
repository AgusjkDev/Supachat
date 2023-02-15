import { useState, useEffect } from "react";

import { regex } from "data";

export default function useSearch() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const sanitizedQuery = search.replace(regex.sanitizeQuery, "");

        setQuery(sanitizedQuery.length >= 3 ? sanitizedQuery : "");
    }, [search]);

    return { query, updateQuery: setSearch };
}
