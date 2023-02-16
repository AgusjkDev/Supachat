import Spinner from "./Spinner";

export default function LoadingScreen() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
            <h1 className="text-center text-4xl font-black text-primary">Supachat</h1>

            <Spinner big />
        </div>
    );
}
