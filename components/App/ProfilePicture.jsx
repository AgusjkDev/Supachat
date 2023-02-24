import Image from "next/image";

export default function ProfilePicture({ username, profile_picture }) {
    return (
        <div className="h-11 w-11">
            <button
                aria-label={`Ver perfil de ${username}`}
                title="Perfil"
                className="h-11 w-11 rounded-full border-2 border-transparent transition-colors hover:border-primary"
            >
                <Image
                    alt={`Foto de perfil de ${username}`}
                    src={profile_picture ?? "/imgs/placeholder.svg"}
                    width={600}
                    height={600}
                    className="rounded-full"
                />
            </button>
        </div>
    );
}
