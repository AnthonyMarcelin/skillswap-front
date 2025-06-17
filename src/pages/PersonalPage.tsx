import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import { logout } from "@/services/auth.service"; // Import de la fonction logout

export default function PersonalPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Appelle la fonction logout du service
      navigate("/"); // Redirection vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <>
      <Header />
      <UserCard />
      
      <button
        onClick={handleLogout}
        className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600"
      >
        Supprimer le compte
      </button>

      <Footer />
    </>
  );
}