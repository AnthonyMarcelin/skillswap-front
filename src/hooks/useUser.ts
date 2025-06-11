// src/hooks/useUser.ts
import { useQuery } from "@tanstack/react-query"
import type { User } from "@/types/user"

export function useUser(id: number) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )
      if (!res.ok) throw new Error("Fetch user failed")
      const raw = await res.json()

      // Adaptation minimale vers notre interface
      return {
        id: raw.id,
        name: raw.name,
        email: raw.email,
        photo: null,          // pas fourni par JSONPlaceholder
        skills: [],           // idem
        availability: "N/A",
        bio: raw.company.catchPhrase,
      } satisfies User
    },
  })
}
