import { UsersListProps } from "@/types/Users";
import Link from "next/link";

export default function UsersList({ data }: UsersListProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-500 p-6 min-h-screen">
      <h1 className="text-xl font-semibold text-white mb-4">Użytkownicy:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {data.map((name) => (
          <Link key={name} href={`get-server-side/${name}`}>
            <div className="border-2 border-amber-300 rounded-lg text-center text-white p-4 bg-none cursor-pointer hover:bg-amber-600 transition">
              {name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
