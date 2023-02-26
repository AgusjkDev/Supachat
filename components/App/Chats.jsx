import { useContext } from "react";

import { AppContext } from "context";
import ProfilePicture from "./ProfilePicture";
import Options from "./Options";
import { Spinner } from "components";

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
                                className="group flex gap-2.5 border-b-[1px] border-background-700 p-3.5 transition-colors duration-300 last:border-none hover:bg-background-800"
                                onClick={() => setOpenedChat(chat)}
                            >
                                <ProfilePicture {...profile} />

                                <div className="flex w-full justify-between">
                                    <div className="flex flex-col justify-evenly">
                                        <span className="text-sm font-medium text-secondary">
                                            {profile.username}
                                        </span>

                                        <span className="text-xs text-secondary-dark">&nbsp;</span>
                                    </div>

                                    <div className="flex flex-col justify-evenly">
                                        <span className="text-xs text-secondary-dark">&nbsp;</span>

                                        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <Options options={[]} small />
                                        </div>
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
