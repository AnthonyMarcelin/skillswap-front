import api from "@/api/axios";

import type { IService, IServiceStatus } from "@/types/service";

export async function getAllServices(userID: string):
Promise<IService[]> {
  const res = await api.get (`/services/user/${userID}`, {
  withCredentials: true, // Pour transmettre le cookie JWT sécurisé
  })
  return res.data;
}

export async function updateServiceStatus(serviceId: string, newStatus: IServiceStatus) {
  const res = await api.post(
    `/services/${serviceId}/status`,
    { newStatus },
    { withCredentials: true } // Pour transmettre le cookie JWT sécurisé
  )
  return res.data
}