import Image from "next/image";

export default function Spinner({ big = false }) {
    return (
        <Image
            alt="Cargando..."
            src="/imgs/spinner.svg"
            width={big ? 32 : 20}
            height={big ? 32 : 20}
            quality={100}
            priority
        />
    );
}
