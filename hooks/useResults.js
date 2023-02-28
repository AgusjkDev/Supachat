import { useContext, useState, useCallback, useEffect } from "react";
import debounce from "just-debounce-it";

import { SupabaseContext, AppContext } from "context";
import { RESULTS_EXPIRATION_TIME } from "constants";

export default function useResults(query) {
    const { searchQuery } = useContext(SupabaseContext);
    const { setAlert } = useContext(AppContext);
    const [searchedResults, setSearchedResults] = useState(null);
    const [results, setResults] = useState(null);
    const [searchedQuery, setSearchedQuery] = useState("");
    const [storedResults, setStoredResults] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    const getResults = useCallback(
        debounce(q => {
            setSearchedQuery(q);
            setIsSearching(true);

            searchQuery(q).then(data => {
                if (data) setSearchedResults(data);
                else setAlert("¡Hubo un error al buscar personas!");

                setIsSearching(false);
            });
        }, 500),
        []
    );

    useEffect(() => {
        if (!query) {
            if (results) setResults(null);

            return;
        }

        const storedResult = storedResults[query];
        if (storedResult) {
            if (Date.now() - storedResult.timestamp < RESULTS_EXPIRATION_TIME) {
                return setResults(storedResult.result);
            }

            setStoredResults(prevState => ({ ...prevState, [query]: undefined }));
        }

        if (isSearching && searchedQuery === query) return;

        getResults(query);
    }, [query]);

    useEffect(() => {
        if (!searchedResults) return;

        if (query) setResults(searchedResults);

        setStoredResults(prevState => ({
            ...prevState,
            [searchedQuery]: { result: searchedResults, timestamp: Date.now() },
        }));
        setSearchedResults(null);
    }, [searchedResults]);

    return { results, getResults };
}
