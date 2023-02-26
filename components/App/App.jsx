import { useContext } from "react";

import { SupabaseContext, AppContext } from "context";
import ProfilePicture from "./ProfilePicture";
import ThemeButton from "./ThemeButton";
import Options from "./Options";
import Search from "./Search";
import Results from "./Results";
import Chats from "./Chats";
import Chat from "./Chat";
import Alert from "./Alert";
import { useQuery, useResults } from "hooks";

export default function App() {
    const { profile, logout } = useContext(SupabaseContext);
    const { openedChat, alert, setOpenedChat, setAlert } = useContext(AppContext);
    const { search, query, updateSearch } = useQuery();
    const { results, getResults } = useResults(query);

    const options = [
        {
            key: "logout",
            children: "Cerrar Sesión",
            onClick: () => logout(),
        },
    ];

    return (
        <>
            <main className="relative flex bg-background-900">
                <div className="flex w-full flex-col lg:max-w-md lg:flex-1 lg:border-r-[1px] lg:border-r-background-700">
                    <header className="grid grid-cols-3 items-center border-b-[1px] border-b-background-700 p-3.5 lg:py-2.5">
                        <ProfilePicture {...profile} />

                        <h1 className="text-center text-lg font-bold text-primary lg:text-base">
                            Supachat
                        </h1>

                        <div className="flex justify-end gap-1.5">
                            <ThemeButton />

                            <Options options={options} />
                        </div>
                    </header>

                    <Search search={search} updateSearch={updateSearch} getResults={getResults} />

                    <div className="scrollbar max-h-[calc(100vh-73px-53px)] min-h-[calc(100vh-73px-53px)] overflow-y-auto lg:max-h-[calc(100vh-65px-53px)] lg:min-h-[calc(100vh-65px-53px)]">
                        {results.length > 0 ? (
                            <Results results={results} clearResults={() => updateSearch("")} />
                        ) : (
                            <Chats />
                        )}
                    </div>
                </div>

                <div
                    className={`bg-background-900 lg:static lg:block lg:min-h-screen lg:w-auto lg:flex-[2] ${
                        openedChat ? "fixed min-h-screen w-full" : "hidden"
                    }`}
                >
                    {openedChat && (
                        <Chat openedChat={openedChat} exitOpenedChat={() => setOpenedChat(null)} />
                    )}
                </div>
            </main>

            {alert && <Alert alert={alert} hideAlert={() => setAlert("")} />}
        </>
    );
}
