import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PersonalPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Si tu utilises un cookie JWT, tu peux le supprimer ici :
    document.cookie = "accessToken=; Max-Age=0";

    // Redirection vers la page de connexion
    navigate("/");
  };

  return (
    <>
      <Header />

      <main className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Bienvenue sur ta page personnelle</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </main>

      <Footer />
    </>
  );
}
