import { useContext, useState, useCallback, useEffect } from "react";
import debounce from "just-debounce-it";

import { SupabaseContext } from "context";

export default function useSearch() {
    const { searchQuery } = useContext(SupabaseContext);
    const [query, setQuery] = useState("");
    const [searchedQuery, setSearchedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [storedResults, setStoredResults] = useState({});

    const debouncedSearchQuery = useCallback(
        debounce(
            query =>
                searchQuery(query).then(data => {
                    if (!data) return;

                    setResults(data);
                    setSearchedQuery(query);
                }),
            500,
            true
        ),
        []
    );

    useEffect(() => {
        const cleanQuery = query.trim();
        if (cleanQuery.length < 3) {
            if (results) setResults([]);

            return;
        }

        const storedResult = storedResults[query];
        if (storedResult) return setResults(storedResult);

        debouncedSearchQuery(cleanQuery);
    }, [query]);

    useEffect(() => {
        if (results.length === 0) return;

        setStoredResults(prevState => ({ ...prevState, [query]: results }));
    }, [results]);

    return {
        query,
        results,
        setQuery,
        search: () => query !== searchedQuery && debouncedSearchQuery.flush(),
    };
}
