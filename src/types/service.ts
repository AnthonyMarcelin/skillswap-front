// Définition des statuts possibles pour un service
export type IServiceStatus = "en attente" | "accepté" | "terminé"

// Interface représentant un service échangé entre deux utilisateurs
export interface IService {
  id: number
  title: string
  giverName: string
  receiverName: string
  giverId: number
  receiverId: number
  status: IServiceStatus
  date: string
}
