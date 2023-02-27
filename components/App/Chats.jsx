import { useContext } from "react";

import { AppContext } from "context";
import { ProfilePicture, Options } from "components/App";
import { Spinner } from "components";
import { useShownChats } from "hooks";

export default function Chats() {
    const { chats, openedChat, setOpenedChat, setChatHidden } = useContext(AppContext);
    const { isLoading, shownChats } = useShownChats(chats);

    return (
        <div
            {...((isLoading || !shownChats) && {
                className: "flex h-full items-center justify-center",
            })}
        >
            {isLoading ? (
                <Spinner />
            ) : !shownChats ? (
                <span className="text-center text-xl font-bold text-primary">
                    ¡No tienes chats!
                </span>
            ) : (
                <>
                    {shownChats.map(chat => {
                        const { id, profile } = chat;

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

                                        <span className="text-xs text-secondary-dark">&nbsp;</span>
                                    </div>

                                    <div className="flex flex-col justify-evenly">
                                        <span className="text-xs text-secondary-dark">&nbsp;</span>

                                        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <Options
                                                options={[
                                                    {
                                                        key: "hide",
                                                        children: "Ocultar Chat",
                                                        onClick: () => setChatHidden(chat),
                                                    },
                                                ]}
                                                small
                                            />
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
