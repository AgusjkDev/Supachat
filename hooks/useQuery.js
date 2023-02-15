import { useState, useEffect } from "react";

export default function useSearch() {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const cleanSearch = search.trim();

        setQuery(cleanSearch.length >= 3 ? cleanSearch : "");
    }, [search]);

    return { query, updateQuery: setSearch };
}
