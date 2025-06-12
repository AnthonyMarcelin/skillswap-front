// src/components/Forms/LoginForm.tsx
import { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((p) => ({ ...p, [name]: value.trimStart() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    if (loginData.password.length < 8) {
      alert("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }

    // ➜ remplace par un appel API auth plus tard
    console.log("Connexion", loginData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titre */}
      <h2 className="text-center text-xl font-semibold">
        Vous avez déjà un compte&nbsp;?
      </h2>

      {/* Email */}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={loginData.email}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black"
      />

      {/* Password */}
      <input
        name="password"
        type="password"
        minLength={8}
        required
        placeholder="Mot de passe"
        autoComplete="current-password"
        value={loginData.password}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 bg-white text-black"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90"
      >
        Se connecter
      </button>
    </form>
  );
}
