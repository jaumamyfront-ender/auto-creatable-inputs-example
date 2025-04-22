import { UsersListProps } from "@/types/Users";

export default function UsersList({ data }: UsersListProps) {
  console.log(data);
  return (
    <div className="flex flex-col self-center items-center justify-center bg-zinc-500 p-6">
      <h1 className="flex self-center">Użytkownicy:</h1>
      <ul>
        {data.map((name) => (
          <li
            key={name}
            className="border-2 border-amber-300 rounded-lg text-center mb-2 cursor-pointer"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
