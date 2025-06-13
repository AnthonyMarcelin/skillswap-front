import api from '@/api/axios'

import type { IUser } from "@/types/user";

export async function getUserById(id: string): Promise<IUser> {
  const res = await api.get(`/users/${id}`);
  return res.data.data;
}
