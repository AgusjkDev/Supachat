import { useContext } from "react";

import { AppContext } from "context";
import { ProfilePicture, Options } from "components/App";
import { Spinner } from "components";
import { useFilteredChats } from "hooks";
import { formatDate } from "helpers";

export default function Chats() {
    const { chats, openedChat, setOpenedChat, setChatHidden } = useContext(AppContext);
    const { isLoading, filteredChats } = useFilteredChats(chats);

    return (
        <div
            {...((isLoading || !filteredChats) && {
                className: "flex h-full items-center justify-center",
            })}
        >
            {isLoading ? (
                <Spinner />
            ) : !filteredChats ? (
                <span className="text-center text-lg font-bold text-primary">
                    ¡No tienes chats!
                </span>
            ) : (
                <>
                    {filteredChats.map(chat => {
                        const { id, last_message, profile } = chat;

                        const isActive = id === openedChat?.id;

                        return (
                            <div
                                key={id}
                                role="button"
                                className={`group flex gap-2.5 border-b-[1px] border-background-700 p-3.5 last:border-none ${
                                    isActive
                                        ? "bg-background-800"
                                        : "bg-background-900 transition-colors duration-300 hover:bg-background-800"
                                }`}
                                onClick={() => setOpenedChat(chat)}
                            >
                                <ProfilePicture {...profile} />

                                <div className="flex w-full justify-between">
                                    <div className="flex flex-col justify-evenly">
                                        <span className="text-sm font-medium text-secondary">
                                            {profile.username}
                                        </span>

                                        <span className="text-xs text-secondary-dark">
                                            {last_message.content}
                                        </span>
                                    </div>

                                    <div className="flex flex-col justify-evenly">
                                        <span className="text-xs text-secondary-dark">
                                            {formatDate(last_message.created_at, "chat")}
                                        </span>

                                        <Options
                                            options={[
                                                {
                                                    key: "hide",
                                                    children: "Ocultar Chat",
                                                    onClick: () => setChatHidden(chat),
                                                },
                                            ]}
                                            hiddenUntilHover
                                            small
                                        />
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
