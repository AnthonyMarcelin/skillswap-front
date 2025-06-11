import { useState } from "react";

export default function LoginForm() {
  // État local pour stocker les données saisies dans le formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: "", // Champ pour l'adresse email
    password: "", // Champ pour le mot de passe
  });

  // Fonction appelée à chaque modification dans un champ du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: typeof value === "string" ? value.trimStart() : value,
    });
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
    alert("❌ Merci de remplir tous les champs.");
    return;
  }

  if (loginData.password.length < 8) {
    alert("❌ Le mot de passe doit faire au moins 8 caractères.");
    return;
  }

    // Ici, on affiche les données saisies dans la console
    // Tu peux remplacer ça par un appel à une API d'authentification
    console.log("Connexion", loginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Titre au-dessus du formulaire */}
      {/* <h2 className="m-2 text-center text-xl font-bold">
        Vous avez déjà un compte ?
      </h2> */}

      {/* Champ email */}
      <input
        name="email" 
        type="email" 
        required
        placeholder="Email" 
        value={loginData.email} // valeur actuelle du champ (provenant de l'état)
        onChange={handleChange} // fonction appelée à chaque frappe clavier
        className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
      />

      {/* Champ mot de passe */}
      <input
        name="password"
        type="password"
        minLength={8}
        required
        pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};:\\\|,.<>/?]).+$"
        placeholder="Mot de passe"
        autoComplete="current-password" // aide les gestionnaires de mot de passe du navigateur
        value={loginData.password}
        onChange={handleChange}
        className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
      />

      {/* Bouton de connexion */}
      <button
        type="submit" // permet de déclencher le onSubmit du formulaire
        className="
          w-full rounded
          bg-[var(--color-accent)]           // couleur de fond selon ta charte (orange foncé)
          py-2 font-semibold text-white
          hover:opacity-90                   // effet visuel au survol
        "
      >
        Se connecter
      </button>
    </form>
  );
}
