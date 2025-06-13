import api from '@/api/axios'

import type { User } from "@/types/user";

export async function getUserById(id: string): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data.data;
}
