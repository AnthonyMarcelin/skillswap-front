// types/service.ts
export type IServiceStatus = "en attente" | "accepté" | "terminé"

export interface IService {
  id: string
  title: string
  giverName: string
  receiverName: string
  giverId: string
  receiverId: string
  status: IServiceStatus
  createdAt: string
}
