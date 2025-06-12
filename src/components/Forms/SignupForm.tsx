// src/components/Forms/SignupForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SkillModal from "../Skills/SkillModal";
import { register } from "@/services/auth.service";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  skills: string[];
  availability: string;
  about: string;
  address: string;
  city: string;
  zip: string;
  category: string;
  photo: File | null;
};

export default function SignupForm() {

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: [],
    availability: "",
    about: "",
    address: "",
    city: "",
    zip: "",
    category: "",
    photo: null,
  });

  // Affiche cache la modale de sélection des compétences
  const [showModal, setShowModal] = useState(false); 
  // Passe à true quand la requête http est en cours
  const [loading, setLoading] = useState(false); 
  // Contient un message d’erreur éventuel
  const [error, setError] = useState<string | null>(null); 

  // Permet de changer de page après un succès (React-Router).
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.trimStart() : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.skills.length === 0) {
      alert("Veuillez sélectionner au moins une compétence !");
      return;
    }

    /* Validation 2 : password match */
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    /* Construction du DTO strictement attendu par le back */
    const dto = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
      street: formData.address,
      zipcode: formData.zip,
      city: formData.city,
      profil_photo: "", // on gérera l’upload plus tard
      description: formData.about,
      availability: formData.availability,
    } as const;

    try {
      setLoading(true);
      setError(null);

      await register(dto); 

      // Succés redirection a remplacer
      navigate("/search");
    } catch (err: any) {
      // AxiosError
      const msg = err.response?.data?.message ?? "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-center text-2xl font-bold">Ça commence ici !</h1>
        <h2 className="text-center text-xl font-bold">
          Inscrivez-vous pour partager vos compétences
        </h2>

        {/* -------- Photo + infos utilisateur -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ---- Colonne gauche : photo ---- */}
          <div className="flex flex-col items-center gap-2">
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Aperçu"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full shadow-md">
                Photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-white"
            />
          </div>

          {/* ---- Colonnes droite : inputs texte ---- */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prénom / Nom */}
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              required
              minLength={2}
              maxLength={30}
              pattern="^[A-Za-zÀ-ÿ\s\-']{2,30}$"
              className="rounded border px-3 py-2 bg-white text-black"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nom"
              required
              minLength={2}
              maxLength={30}
              pattern="^[A-Za-zÀ-ÿ\s\-']{2,30}$"
              className="rounded border px-3 py-2 bg-white text-black"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              className="rounded border px-3 py-2 bg-white text-black col-span-2"
            />

            {/* Password + confirmation */}
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              autoComplete="new-password"
              required
              minLength={8}
              pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\\]{};:\\|,.<>/?]).+$"
              className="rounded border px-3 py-2 bg-white text-black col-span-2"
            />
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmer le mot de passe"
              autoComplete="new-password"

              minLength={8}
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$"
              className="rounded border px-3 py-2 bg-white text-black col-span-2"
            />
          </div>
        </div>

        {/* Adresse / Ville / ZIP */}
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresse"
          required
          pattern="^[A-Za-zÀ-ÿ0-9\s,\-']{5,100}$"
          className="w-full rounded border px-3 py-2 bg-white text-black"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ville"
          required
          pattern="^[A-Za-zÀ-ÿ\s\-']{2,40}$"
          className="w-full rounded border px-3 py-2 bg-white text-black"
        />
        <input
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          placeholder="Code postal"
          required
          type="text"
          pattern="^\d{5}$"
          minLength={5}
          maxLength={5}
          className="w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* Catégorie */}
        <label className="block text-sm">Catégorie :</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-white text-black mb-3"
        >
          <option value="">Choisir une catégorie</option>
          <option value="developpeur">Développeur</option>
          <option value="designer">Designer</option>
          <option value="chefprojet">Chef de projet</option>
        </select>

        {/* Compétences */}
        <label className="block text-sm">Compétences :</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full rounded border px-3 py-2 bg-[var(--color-primary)] text-[var(--color-secondary)] font-semibold hover:opacity-90 mb-3"
        >
          Choisir mes compétences
        </button>

        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-[var(--color-secondary)] text-[var(--color-whitish)] rounded-full px-4 py-1 text-sm shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Disponibilité */}
        <label className="block text-sm">Disponibilités :</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-white text-black mb-4"
        >
          <option value="">Choisir</option>
          <option value="available1">Semaine</option>
          <option value="available2">Week-end</option>
        </select>

        {/* À propos */}
        <label className="block text-sm">À propos :</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Parle-nous de toi"
          className="w-full resize-none rounded border px-3 py-2 bg-white text-black mb-4"
        />

        {/* Bouton Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement…" : "S’inscrire"}
        </button>

        {/* Message d’erreur éventuel */}
        {error && (
          <p className="mt-2 text-center text-red-500 font-semibold">{error}</p>
        )}
      </form>

      {/* Modale de sélection des compétences */}
      {showModal && (
        <SkillModal
          selectedSkills={formData.skills}
          onClose={() => setShowModal(false)}
          onSave={(skills) => setFormData((prev) => ({ ...prev, skills }))}
        />
      )}
    </>
  );
}
