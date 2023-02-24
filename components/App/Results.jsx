import ProfilePicture from "./ProfilePicture";

export default function Results({ results }) {
    return (
        <>
            {results.map(result => {
                const { id, username, profile_picture, status } = result;

                return (
                    <div
                        key={id}
                        role="button"
                        className="flex items-center border-b-[1px] border-b-background-700 p-3.5 transition-colors duration-300 last:border-none hover:bg-background-800"
                    >
                        <div className="flex gap-3">
                            <ProfilePicture username={username} profile_picture={profile_picture} />

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
