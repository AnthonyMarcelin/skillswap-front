import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { useEffect, useState } from "react";
import { getMyServices, getRawServices } from "@/services/service.service";
import type { IService } from "@/types/service";
import ReviewCard from "@/components/ReviewCard";

export default function PersonalPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState<IService[]>([]);
  const [error, setError] = useState("");

  // Fonction appelée quand l’utilisateur clique sur “Se déconnecter”
  const handleLogout = async () => {
    // on supprime le cookie contenant le token
    document.cookie = "accessToken=; Max-Age=0";
    console.log("→ Token supprimé");
    // on redirige vers la page d’accueil
    navigate("/");
  };

  // Quand le composant s'affiche (et si l'ID change), on va chercher les services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        let data: IService[];

        // Si on a un ID dans l’URL : on affiche les services de l'utilisateur
        if (id) {
          // Si un id est présent dans l'URL, on affiche ses services publics
          data = await getRawServices(Number(id));
        } else {
          // Sinon, on récupère les services de l'utilisateur connecté
          data = await getMyServices();
        }

        setServices(data);
      } catch (err) {
        console.error("Erreur lors du chargement des services", err);
        setError("Aucune réservation trouvée.");
      }
    };

    fetchServices();
  }, [id]); // on relance la fonction si l'id change

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
          ) : (
            <ul className="space-y-2">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="bg-gray-800 p-4 rounded text-white"
                >
                  <p className="font-semibold">{service.title}</p>
                  <p className="text-sm">Statut : {service.status}</p>
                  <p className="text-xs italic">
                    Donné par : {service.giverName} → Reçu par :{" "}
                    {service.receiverName}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <ReviewCard />
      <Footer />
    </>
  );
}
