import { useContext } from "react";

import { AppContext } from "context";
import { ProfilePicture, Options } from "components/App";

export default function Results({ results, clearResults }) {
    const { chats, setOpenedChat } = useContext(AppContext);

    const handleResultClick = async resultProfile => {
        clearResults();

        const foundChat = chats.find(chat => chat.profile.id === resultProfile.id);

        setOpenedChat(foundChat ? foundChat : { profile: resultProfile, messages: [] });
    };

    return (
        <>
            {results.map(resultProfile => {
                const { id, username, status } = resultProfile;

                return (
                    <div
                        key={id}
                        role="button"
                        className="group flex gap-2.5 border-b-[1px] border-background-700 bg-background-900 p-3.5 transition-colors duration-300 last:border-none hover:bg-background-800"
                        onClick={() => handleResultClick(resultProfile)}
                    >
                        <ProfilePicture {...resultProfile} />

                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full flex-col justify-evenly">
                                <span className="text-sm font-medium text-secondary">
                                    {username}
                                </span>

                                <span className="text-xs text-secondary-dark">{status}</span>
                            </div>

                            <Options
                                options={[
                                    {
                                        key: "hide",
                                        children: "Ocultar Chat",
                                        onClick: () => setChatHidden(chat),
                                    },
                                ]}
                                hiddenUntilHover
                            />
                        </div>
                    </div>
                );
            })}
        </>
    );
}
