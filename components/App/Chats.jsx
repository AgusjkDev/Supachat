import { useContext } from "react";

import { AppContext } from "context";
import Spinner from "components/Spinner";
import ProfilePicture from "./ProfilePicture";
import { formatDate } from "helpers";

export default function Chats() {
    const { chats, setOpenedChat } = useContext(AppContext);

    const isLoading = !chats;
    const noChats = chats?.length === 0;

    return (
        <div
            {...((isLoading || noChats) && {
                className: "flex h-full items-center justify-center",
            })}
        >
            {isLoading ? (
                <Spinner />
            ) : noChats ? (
                <span className="text-center text-xl font-bold text-primary">
                    ¡No tienes chats!
                </span>
            ) : (
                <>
                    {chats.map(chat => {
                        const { chat_id, profile } = chat;

                        return (
                            <div
                                key={chat_id}
                                role="button"
                                className="flex border-b-[1px] border-b-background-700 p-3.5 transition-colors duration-300 last:border-none hover:bg-background-800"
                                onClick={() => setOpenedChat(chat)}
                            >
                                <div className="flex w-full gap-3">
                                    <ProfilePicture {...profile} />

                                    <div className="flex w-full flex-col justify-evenly">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="text-sm font-medium text-secondary">
                                                {profile.username}
                                            </span>

                                            <span className="text-xs text-secondary-dark">
                                                &nbsp;
                                            </span>
                                        </div>

                                        <span className="text-xs text-secondary-dark">&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}
