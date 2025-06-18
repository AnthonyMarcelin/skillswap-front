import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { logout } from "@/services/auth.service";

export default function PersonalPage() {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Déconnexion réussie:", "cookie supprimé");
      window.location.href = "/register";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // Vous pouvez gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    }
  };

  return (
    <>
      <Header />

      <main className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">
          Bienvenue sur ta page personnelle
        </h1>
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
