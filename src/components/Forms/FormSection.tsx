// src/components/Forms/FormSection.tsx
import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm  from "./LoginForm";

export default function FormSection() {
  const [showSignup, setShowSignup] = useState(true);

  return (
    <section className="py-10 bg-[var(--color-secondary)] text-white">

      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl font-bold">Ça commence ici&nbsp;!</h1>
        <h2 className="text-xl font-semibold">
          Inscrivez-vous pour partager vos compétences
        </h2>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 grid gap-12 md:grid-cols-2">
        <SignupForm />

        <div className={showSignup ? "hidden md:block" : ""}>
          <LoginForm />
        </div>
      </div>

      <button
        onClick={() => setShowSignup(!showSignup)}
        className="mt-8 block w-full text-center underline hover:text-[var(--color-accent)] md:hidden"
      >
        {showSignup
          ? "Déjà un compte ? Se connecter"
          : "Pas encore inscrit ? Créer un compte"}
      </button>
    </section>
  );
}
