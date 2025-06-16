import api from '@/api/axios'

import type { IUser } from "@/types/user";

export async function getUserById(id: string): Promise<IUser> {
  const res = await api.get(`/users/${id}`);
  return res.data.data;
}

export async function getLastUsers(): Promise<IUser[]> {
  const res = await api.get('/users/latest');
  return res.data.data;
}
