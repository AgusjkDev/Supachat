import { useState, useEffect } from "react";

import { sanitizeQuery } from "helpers";

export default function useSearch() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const sanitizedQuery = sanitizeQuery(search);

        setQuery(sanitizedQuery.length >= 3 ? sanitizedQuery : "");
    }, [search]);

    return { search, query, updateSearch: setSearch };
}
