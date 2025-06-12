import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export function FormSection() {
  // État local qui permet de basculer entre le formulaire d'inscription (true) et de connexion (false)
  const [showSignup, setShowSignup] = useState(true);

  return (
    <div className="bg-[var(--color-secondary)] text-white">
      {/* Conteneur principal avec fond et texte blanc (défini par la charte graphique) */}

      <section className="py-8">
        {/* Section avec un peu d'espace vertical */}

        <h1 className="mb-6 text-center text-2xl font-bold">
          Ca Commence ici !
        </h1>

        <h2 className="mb-6 text-center text-xl font-bold">
          {/* Titre dynamique en fonction du formulaire affiché */}
          {showSignup
            ? "Inscrivez-vous pour partager vos compétences"
            : "Connectez-vous"}
        </h2>

        {/* Conteneur centralisé pour le formulaire (responsive) */}
        <div className="mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg px-6 py-8">
          {/* Affiche le formulaire d'inscription ou de connexion selon l'état */}
          {showSignup ? <SignupForm /> : <LoginForm />}

          {/* Bouton pour inverser l'état (toggle entre inscription et connexion) */}
          <button
            onClick={() => setShowSignup(!showSignup)} // Inverse le booléen
            className="mt-4 underline text-center block w-full text-white hover:text-[var(--color-accent)]"
          >
            {/* Texte du bouton dynamique */}
            {showSignup
              ? "Déjà un compte ? Se connecter"
              : "Pas encore inscrit ? Créer un compte"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default FormSection;
