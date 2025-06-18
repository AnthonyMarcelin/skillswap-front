import { useState } from "react"
import { updateServiceStatus } from "@/services/service.service"
import type { IServiceStatus } from "@/types/service"

// Hook personnalisé pour gérer le statut d’un service (local + API)
export function useServiceStatus(serviceId: string, initialStatus: IServiceStatus) {
  // État local du statut du service (ex : "pending", "accepted", etc.)
  const [status, setStatus] = useState<IServiceStatus>(initialStatus)

  // État de chargement (utile pour désactiver les boutons pendant l’appel)
  const [loading, setLoading] = useState(false)

  // Fonction pour changer le statut via l'API, et mettre à jour l’état local
  const changeStatus = async (newStatus: IServiceStatus) => {
    setLoading(true) // Active l’indicateur de chargement
    try {
      await updateServiceStatus(serviceId, newStatus) // Envoie la MAJ au backend
      setStatus(newStatus) // Met à jour le statut local si tout s’est bien passé
    } catch (error) {
      console.error("Erreur mise à jour statut", error) // Log en cas d’erreur
    } finally {
      setLoading(false) // Toujours désactiver le chargement à la fin
    }
  }

  // Le hook expose le statut courant, l’état de chargement et la fonction d’action
  return { status, loading, changeStatus }
}
