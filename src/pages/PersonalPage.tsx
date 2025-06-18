// Imports React Router pour la navigation et l’accès aux paramètres d’URL
import { useNavigate, useParams } from "react-router-dom";

// Imports des composants globaux de la page
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import ReviewCard from "@/components/ReviewCard";

// Import de hooks et fonctions React
import { useEffect, useState } from "react";

// Appels aux services liés aux réservations
import { getMyServices, getRawServices } from "@/services/service.service";

// Typage des données de service
import type { IService } from "@/types/service";

// Gestion de l’authentification (déconnexion)
import { logout } from "@/services/auth.service";

// Récupération des infos de l’utilisateur connecté
import { getCurrentUser } from "@/services/user.service";

// Composant réutilisable d'affichage d'un service
import { ServiceCard } from "@/components/ServiceCard";

// Typage de l’utilisateur courant
import type { IUser } from "@/types/user"; 

export default function PersonalPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState<IService[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Déconnexion réussie:", "cookie supprimé");
      window.location.href = "/register";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Effet qui se déclenche à l'affichage ou si l'ID change
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user); // On stocke l'utilisateur courant

        let data: IService[];

        // Si un id est présent dans l'URL, on affiche les services publics de cet utilisateur
        if (id) {
          data = await getRawServices(Number(id));
        } else {
          // Sinon, on affiche les services liés à l'utilisateur connecté
          data = await getMyServices();
        }

        setServices(data);
      } catch (err) {
        console.error("Erreur lors du chargement des services", err);
        setError("Aucune réservation trouvée.");
      }
    };

    fetchServices();
  }, [id]);

  return (
    <>
      <Header />

      <main className="p-4 text-center space-y-8">
        <h1 className="text-xl font-semibold">
          Bienvenue sur ta page personnelle
        </h1>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600"
        >
          Se déconnecter
        </button>

        <UserCard />

        <div className="mt-8 text-left">
          <h2 className="text-lg font-bold text-white mb-4">
            Mes Réservations
          </h2>

          {error ? (
            <p className="text-sm italic text-gray-400">{error}</p>
          ) : currentUser ? (
            <div className="space-y-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  currentUserId={currentUser.id}
                  onStatusUpdate={(newStatus) => {
                    // Mise à jour locale du statut dans le tableau
                    setServices((prev) =>
                      prev.map((s) =>
                        s.id === service.id ? { ...s, status: newStatus } : s
                      )
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">
              Chargement des données utilisateur...
            </p>
          )}
        </div>
      </main>

      <ReviewCard />
      <Footer />
    </>
  );
}
