import { useContext } from "react";

import { SupabaseContext, AppContext } from "context";
import { ProfilePicture, SvgButton, Options } from "components/App";
import { Spinner } from "components";
import { svgs } from "data";
import { useChatMessaging } from "hooks";
import { formatDate } from "helpers";

export default function Chat({ openedChat, exitOpenedChat }) {
    const { profile } = useContext(SupabaseContext);
    const { setChatHidden } = useContext(AppContext);
    const { message, lastMessageRef, messageInputRef, updateMessage, sendMessage } =
        useChatMessaging(openedChat);

    const { profile: chatterProfile, messages } = openedChat;
    const { username, status } = chatterProfile;

    const handleMessageSubmit = e => {
        e.preventDefault();

        sendMessage();
    };

    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between border-b-[1px] border-b-background-700 p-3.5 lg:p-2.5">
                <div className="flex gap-3">
                    <div className="flex items-center">
                        <SvgButton
                            ariaLabel="Volver a chats"
                            title="Volver"
                            className="lg:hidden"
                            onClick={exitOpenedChat}
                            svg={svgs.leftArrow}
                        />

                        <SvgButton
                            ariaLabel="Ocultar chat"
                            title="Ocultar"
                            className="hidden lg:grid"
                            onClick={exitOpenedChat}
                            svg={svgs.x}
                        />

                        <ProfilePicture {...chatterProfile} />
                    </div>

                    <div className="flex flex-col justify-evenly">
                        <span className="text-sm font-medium text-secondary">{username}</span>

                        <span className="text-xs text-secondary-dark">{status}</span>
                    </div>
                </div>

                <Options
                    options={[
                        {
                            key: "hide",
                            children: "Ocultar Chat",
                            onClick: () => setChatHidden(openedChat),
                        },
                    ]}
                />
            </header>

            <div className="scrollbar max-h-[calc(100vh-73px-71px)] [overflow-y:overlay] lg:max-h-[calc(100vh-65px-63px)]">
                <div
                    className={`min-h-[calc(100vh-73px-71px)] lg:min-h-[calc(100vh-65px-63px)] ${
                        messages
                            ? "flex flex-col gap-4 p-4 md:px-8 lg:justify-end 2xl:px-16 landscape:px-6"
                            : "grid place-items-center"
                    }`}
                >
                    {messages ? (
                        messages.map((group, index) => {
                            const isLastGroup = index === messages.length - 1;

                            return (
                                <div key={index} className="flex flex-col gap-1">
                                    {group.map(({ id, content, created_at, profile_id }, idx) => {
                                        const isOwnMessage = profile_id === profile.id;
                                        const isLastMessage =
                                            isLastGroup && idx === group.length - 1;

                                        return (
                                            <div
                                                key={id}
                                                className={`flex ${
                                                    isOwnMessage ? " justify-end" : ""
                                                }`}
                                            >
                                                <div
                                                    {...(isLastMessage && { ref: lastMessageRef })}
                                                    className={`flex min-w-[75px] max-w-[85%] justify-between gap-3.5 rounded-lg p-3 lg:max-w-[66.666667%] ${
                                                        isOwnMessage
                                                            ? "bg-background-600"
                                                            : "bg-background-800"
                                                    }`}
                                                >
                                                    <span className="text-sm text-secondary">
                                                        {content}
                                                    </span>

                                                    <span className="mt-auto text-left text-xs text-secondary-dark">
                                                        {formatDate(created_at, "message")}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    ) : (
                        <Spinner big />
                    )}
                </div>
            </div>

            <footer className="fixed bottom-0 w-full border-t-[1px] border-t-background-700 bg-background-900 p-3.5 lg:static lg:bottom-auto lg:mt-auto lg:p-3">
                <form
                    autoComplete="off"
                    className="mx-auto flex w-[95%] items-center justify-center gap-3 lg:gap-4"
                    onSubmit={e => handleMessageSubmit(e)}
                >
                    <input
                        ref={messageInputRef}
                        type="text"
                        placeholder="Escribe un mensaje..."
                        className="w-full rounded-sm border-[1px] border-background-700 bg-transparent p-2.5 text-sm text-secondary placeholder:text-secondary-darker focus:outline focus:outline-2 focus:outline-background-800 sm:w-[90%] md:w-[85%] lg:w-[95%] lg:p-2 2xl:w-[90%]"
                        value={message}
                        onChange={e => updateMessage(e.target.value)}
                    />

                    <SvgButton
                        ariaLabel="Enviar mensaje"
                        title="Enviar"
                        type="submit"
                        svg={svgs.send}
                    />
                </form>
            </footer>
        </div>
    );
}
