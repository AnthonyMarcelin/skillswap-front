import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { IService, IServiceStatus } from "@/types/service"
import { useServiceStatus } from "@/hooks/useServiceStatus"

interface ServiceCardProps {
  service: IService
  currentUserId: string
  onStatusUpdate?: (newStatus: IServiceStatus) => void
}

export function ServiceCard({ service, currentUserId, onStatusUpdate }: ServiceCardProps) {
  const { id, giverName, receiverName, giverId, receiverId, title, createdAt } = service
  const { status, loading, changeStatus } = useServiceStatus(id, service.status)

  const isGiver = currentUserId === giverId
  const isReceiver = currentUserId === receiverId

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "en attente":
        return "bg-yellow-100 text-yellow-800"
      case "accepté":
        return "bg-blue-100 text-blue-800"
      case "terminé":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusChange = (newStatus: IServiceStatus) => {
    changeStatus(newStatus)
    onStatusUpdate?.(newStatus)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge className={getBadgeStyle(status)}>{status}</Badge>
        </div>

        <div className="text-sm text-gray-600">
          Donneur : <strong>{giverName}</strong>
        </div>
        <div className="text-sm text-gray-600">
          Receveur : <strong>{receiverName}</strong>
        </div>
        <div className="text-xs text-muted-foreground">
          Créé le : {format(new Date(createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
        </div>

        {status === "en attente" && isGiver && (
          <Button onClick={() => handleStatusChange("accepté")} disabled={loading} className="mt-2">
            Accepter le service
          </Button>
        )}

        {status === "accepté" && isReceiver && (
          <Button
            onClick={() => handleStatusChange("terminé")}
            disabled={loading}
            className="mt-2 bg-green-600 hover:bg-green-700"
          >
            Marquer comme terminé
          </Button>
        )}
      </CardContent>
    </Card>
  )
}