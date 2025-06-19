import { useNavigate, useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { getMyServices, getRawServices } from "@/services/service.service";
import type { IService } from "@/types/service";
import { logout } from "@/services/auth.service";
import { getCurrentUser } from "@/services/user.service";
import { ServiceCard } from "@/components/ServiceCard";
import type { IUser } from "@/types/user";

export default function PersonalPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [services, setServices] = useState<IService[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [error, setError] = useState("");
  const [showServices, setShowServices] = useState(false); // ← Pour le bouton mobile

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/register";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        const data = id
          ? await getRawServices(Number(id))
          : await getMyServices();
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

      <main className="p-6 bg-secondary text-white min-h-screen">
        <h1 className="text-center text-2xl font-bold mb-6">
          Bienvenue sur ta page personnelle
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Bloc gauche : profil et avis */}
          <div className="bg-primary rounded-xl shadow-lg p-6 space-y-6">
            <UserCard />
            <ReviewCard />
          </div>

          {/* Bouton mobile pour afficher les services */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowServices(!showServices)}
              className="w-full bg-accent text-white py-2 rounded shadow hover:bg-opacity-80 transition"
            >
              {showServices ? "Masquer mes services" : "Voir mes services"}
            </button>
          </div>

          {/* Bloc droit : services */}
          <div
            className={`
              bg-primary rounded-xl shadow-lg p-6 space-y-4 scrollbar-custom
              ${showServices ? "block" : "hidden"} 
              md:block md:max-h-[600px] md:overflow-y-auto
            `}
          >
            <h2 className="text-xl font-semibold text-secondary mb-4 text-center">
              Mes Réservations
            </h2>

            {error ? (
              <p className="text-sm italic text-gray-300">{error}</p>
            ) : currentUser ? (
              <div className="flex flex-col gap-4">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    currentUserId={currentUser.id}
                    onStatusUpdate={(newStatus) =>
                      setServices((prev) =>
                        prev.map((s) =>
                          s.id === service.id ? { ...s, status: newStatus } : s
                        )
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-400">
                Chargement en cours...
              </p>
            )}
          </div>
        </div>

        {/* Bouton de déconnexion, toujours visible */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="rounded bg-accent text-white px-6 py-3 font-semibold hover:bg-red-600 transition"
          >
            Se déconnecter
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
