import { useContext } from "react";

import { AppContext } from "context";
import Spinner from "components/Spinner";
import ProfilePicture from "./ProfilePicture";
import { formatDate } from "helpers";

export default function Chats() {
    const { chats } = useContext(AppContext);

    const isLoading = !chats;
    const noChats = chats?.length === 0;

    return (
        <div className={isLoading || noChats ? "flex h-full items-center justify-center" : ""}>
            {isLoading ? (
                <Spinner />
            ) : noChats ? (
                <span className="text-center text-xl font-bold text-primary lg:text-2xl">
                    ¡No tienes chats!
                </span>
            ) : (
                <>
                    {chats.map(({ chat_id, created_at, profile, lastMessage }) => (
                        <button
                            key={chat_id}
                            className="flex w-full justify-between border-b-[1px] border-b-background-700 p-4 transition-colors duration-300 last:border-none hover:bg-background-800 lg:p-3.5"
                        >
                            <div className="flex gap-3">
                                <div className="h-11 w-11">
                                    <ProfilePicture {...profile} />
                                </div>

                                <div className="flex flex-col items-start justify-evenly">
                                    <span className="text-sm font-medium text-secondary">
                                        {profile.username}
                                    </span>

                                    <span className="text-xs text-secondary-dark">
                                        {lastMessage && lastMessage.content}&nbsp;
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-evenly">
                                <span className="text-xs text-secondary-dark">
                                    {formatDate(
                                        lastMessage ? lastMessage.created_at : created_at,
                                        true
                                    )}
                                </span>
                            </div>
                        </button>
                    ))}
                </>
            )}
        </div>
    );
}
