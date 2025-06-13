import type { IUser } from "@/types/user";


export default function ProfileBubble({users} : {users:IUser[]}) {
  return (
    <div className="flex flex-wrap pt-8 justify-center items-center gap-5 pl-2 pr-2">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col items-center">
          <img
            src={user.profile_picture}
            alt={user.firstname}
            className="w-30 h-30 rounded-full object-cover mb-2"
          />
          <div className="text-secondary font-semibold text-center">
            {user.firstname} {user.lastname}
          </div>
        </div>
      ))}
    </div>
  );
}
