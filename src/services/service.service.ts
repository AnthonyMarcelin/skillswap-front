import api from "@/api/axios";
import type { IService, IServiceStatus } from "@/types/service";

export async function getMyServices(): Promise<IService[]> {
  const res = await api.get("/services/me", {
    withCredentials: true, // 🔐 envoie le cookie JWT
  });

  const rawData = res.data.data;
  return rawData.map((item: any) => ({
    ...item,
    status: mapStatus(item.status),
  }));
}

export async function getRawServices(userID: number): Promise<IService[]> {
  const res = await api.get(`/users/${userID}/services-raw`);
  const rawData = res.data.data;
  return rawData.map((item: any) => ({
    ...item,
    status: mapStatus(item.status),
  }));
}

export async function updateServiceStatus(
  serviceId: string,
  newStatus: IServiceStatus
) {
  const res = await api.post(
    `/services/${serviceId}/status`,
    { newStatus },
    { withCredentials: true }
  );
  return res.data;
}

function mapStatus(status: string): "en attente" | "accepté" | "terminé" {
  switch (status) {
    case "pending":
      return "en attente";
    case "accepted":
      return "accepté";
    case "done":
      return "terminé";
    default:
      return "en attente";
  }
}
