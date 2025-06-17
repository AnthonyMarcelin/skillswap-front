import { useState } from "react"
import { updateServiceStatus } from "@/services/service.service"
import type { IServiceStatus } from "@/types/service"

export function useServiceStatus(serviceId: string, initialStatus: IServiceStatus) {
  const [status, setStatus] = useState<IServiceStatus>(initialStatus)
  const [loading, setLoading] = useState(false)

  const changeStatus = async (newStatus: IServiceStatus) => {
    setLoading(true)
    try {
      await updateServiceStatus(serviceId, newStatus)
      setStatus(newStatus)
    } catch (error) {
      console.error("Erreur mise à jour statut", error)
    } finally {
      setLoading(false)
    }
  }

  return { status, loading, changeStatus }
}