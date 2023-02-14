import Image from "next/image";

export default function ProfilePicture({ username, profile_picture }) {
    return (
        <Image
            alt={`Foto de Perfil de ${username}`}
            src={profile_picture ?? "/imgs/placeholder.svg"}
            width={600}
            height={600}
            className="h-full w-full rounded-full"
        />
    );
}
