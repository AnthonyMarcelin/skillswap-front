import { useState } from "react";
// import { login } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // Initialisation de l’état local pour l’email et le mot de passe
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // État pour afficher une erreur éventuelle à l'utilisateur
  const [error, setError] = useState<string | null>(null);

  // Hook React Router pour la redirection après connexion
  const navigate = useNavigate();
  // Fonction de connexion (via contexte d'authentification)
  const { login } = useAuth();

  // Fonction appelée à chaque frappe dans un champ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: typeof value === "string" ? value.trimStart() : value,
    });
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple : vérifier que les champs ne sont pas vides
    if (!loginData.email || !loginData.password) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // Validation de la longueur minimale du mot de passe
    if (loginData.password.length < 8) {
      alert("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    try {
      // Réinitialisation de l'erreur avant la tentative de connexion
      setError(null);
      console.log("Tentative de connexion avec :", loginData);

      // Appel de la fonction login (API POST vers /auth/login)
      const response = await login(loginData);
      console.log("Reponse login: ", response);

      // Connexion réussie, affichage facultatif pour le debug
      console.log("Connexion réussie :", response);

      // Redirection vers la page de profil de l'utilisateur
      navigate(`/personalpage/${response.user.id}`)
    } catch (err: any) {
      console.log("Erreur complète : ", err);

      // Si erreur côté API (401, 500...), on affiche le message retourné
      const msg = err.response?.data?.message ?? "Erreur lors de la connexion.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Vous avez déjà un compte&nbsp;?
      </h2>

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={loginData.email}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black mb-3"
      />

      <input
        name="password"
        type="password"
        minLength={8}
        required
        placeholder="Mot de passe"
        autoComplete="current-password"
        value={loginData.password}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black mb-3"
      />

      <button
        type="submit"
        className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90"
      >
        Se connecter
      </button>

      {error && (
        <p className="text-center text-red-500 font-semibold mt-2">{error}</p>
      )}
    </form>
  );
}
