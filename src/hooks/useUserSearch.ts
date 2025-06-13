import { useState } from "react";
import type { IUser } from "@/types/user";

export function useUserSearch(initialUsers: IUser[]) {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(initialUsers);

  function handleSearch({ skill, zipcode }: { skill: string; zipcode: string }, usersToFilter: IUser[] = initialUsers) {
      console.log("Recherche lancée :", skill, zipcode);

    setFilteredUsers(
      usersToFilter.filter(
        (user) =>
          user.skills.some((s) => s.name === skill) &&
          user.zipcode === zipcode
      )
    );
  }

  return { filteredUsers, handleSearch, setFilteredUsers  };
}