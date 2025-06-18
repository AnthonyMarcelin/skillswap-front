// Import des composants UI réutilisables (carte, badge, bouton)
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Formatage de date avec prise en charge de la locale française
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Import des types TypeScript pour plus de sécurité
import type { IService, IServiceStatus } from "@/types/service";

// Hook personnalisé pour gérer l’état du statut d’un service
import { useServiceStatus } from "@/hooks/useServiceStatus";

// Définition des propriétés attendues pour ce composant
interface ServiceCardProps {
  service: IService;
  currentUserId: number;
  onStatusUpdate?: (newStatus: IServiceStatus) => void;
}

// Composant d’affichage d’un service avec logique conditionnelle
export function ServiceCard({
  service,
  currentUserId,
  onStatusUpdate,
}: ServiceCardProps) {
  // On extrait les données du service avec des valeurs par défaut de secours
  const {
    id,
    giverName = "Inconnu",
    receiverName = "Inconnu",
    giverId,
    receiverId,
    title = "Sans titre",
    date,
  } = service;

  // Utilisation du hook personnalisé pour gérer le statut localement
  const { status, loading, changeStatus } = useServiceStatus(
    id,
    service.status
  );

  // On détermine si l’utilisateur connecté est le donneur ou le receveur
  const isGiver = currentUserId === giverId;
  const isReceiver = currentUserId === receiverId;

  // Fonction pour retourner une classe CSS selon le statut
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "en attente":
        return "bg-yellow-100 text-yellow-800";
      case "accepté":
        return "bg-blue-100 text-blue-800";
      case "terminé":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fonction appelée lorsqu’un statut change (API + retour parent)
  const handleStatusChange = (newStatus: IServiceStatus) => {
    changeStatus(newStatus);
    onStatusUpdate?.(newStatus);
  };

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
          Créé le :{" "}
          {date && !isNaN(new Date(date).getTime())
            ? format(new Date(date), "dd MMMM yyyy à HH:mm", { locale: fr })
            : "Date inconnue"}
        </div>

        {/* Si le service est en attente et que l'utilisateur est le donneur */}
        {status === "en attente" && isGiver && (
          <Button
            onClick={() => handleStatusChange("accepté")}
            disabled={loading}
            className="mt-2"
          >
            Accepter le service
          </Button>
        )}

        {/* Si le service est accepté et que l'utilisateur est le receveur */}
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
  );
}
