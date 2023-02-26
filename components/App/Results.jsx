import { useContext } from "react";

import { AppContext } from "context";
import { ProfilePicture } from "components/App";

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
                        className="flex items-center border-b-[1px] border-b-background-700 p-3.5 transition-colors duration-300 last:border-none hover:bg-background-800"
                        onClick={() => handleResultClick(resultProfile)}
                    >
                        <div className="flex gap-3">
                            <ProfilePicture {...resultProfile} />

                            <div className="flex flex-col items-start justify-evenly">
                                <span className="text-sm font-medium text-secondary">
                                    {username}
                                </span>

                                <span className="text-xs text-secondary-dark">{status}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
