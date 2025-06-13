// src/components/Forms/SignupForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillModal from "../Skills/SkillModal";
import { register } from "@/services/auth.service";

export type FormData = {
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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value.trimStart() }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, photo: e.target.files?.[0] ?? null }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.skills.length)
      return alert("Choisissez au moins 1 compétence");
    if (formData.password !== formData.confirmPassword)
      return alert("Les mots de passe ne correspondent pas");

    const dto = {
      email: formData.email,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
      street: formData.address,
      zipcode: formData.zip,
      city: formData.city,
      profil_photo: "",
      description: formData.about,
      availability: formData.availability,
    } as const;

    try {
      setLoading(true);
      setError(null);
      await register(dto);
      navigate("/search");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre / Sous-titre sur toute la largeur */}
        <div>
          {/* <h1 className="text-3xl font-bold text-center">Inscrivez-vous !</h1> */}
          <h2 className="text-center text-xl font-semibold">
            Inscrivez-vous&nbsp;?
          </h2>
        </div>

        {/* Grille (photo 200px + champs identité) */}
        <div className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-6">
          <div className="flex flex-col items-center gap-3">
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Aperçu"
                className="w-[200px] h-[200px] object-cover rounded-md shadow"
              />
            ) : (
              <div
                className="w-[200px] h-[200px] flex items-center justify-center 
                              rounded-md bg-gray-300 text-gray-600"
              >
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

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="col-span-1 w-full rounded border px-3 py-2"
            />
            <input
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="col-span-1 w-full rounded border px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="col-span-2 w-full rounded border px-3 py-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="col-span-2 w-full rounded border px-3 py-2"
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmer"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className="col-span-2 w-full rounded border px-3 py-2"
            />
          </div>
        </div>

        {/* Adresse / Ville / Zip */}
        <input
          name="address"
          placeholder="Adresse"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full rounded border px-3 py-2"
        />
        <div className="grid grid-cols-3 gap-4">
          <input
            name="city"
            placeholder="Ville"
            value={formData.city}
            onChange={handleChange}
            required
            className="col-span-2 rounded border px-3 py-2"
          />
          <input
            name="zip"
            placeholder="Code postal"
            value={formData.zip}
            onChange={handleChange}
            pattern="\d{5}"
            required
            className="rounded border px-3 py-2"
          />
        </div>

        {/* Catégorie */}
        <label className="text-sm">Catégorie :</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 mb-3"
        >
          <option value="">Choisir une catégorie</option>
          <option value="developpeur">Développeur</option>
          <option value="designer">Designer</option>
          <option value="chefprojet">Chef de projet</option>
        </select>

        {/* Compétences */}
        <label className="text-sm">Compétences :</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full rounded border px-3 py-2 bg-[var(--color-primary)] 
                           text-[var(--color-secondary)] font-semibold mb-3"
        >
          Choisir mes compétences
        </button>
        {!!formData.skills.length && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((s) => (
              <span
                key={s}
                className="bg-[var(--color-secondary)] text-white rounded-full px-4 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Disponibilités */}
        <label className="text-sm">Disponibilités :</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 mb-4"
        >
          <option value="">Choisir</option>
          <option value="weekdays">Semaine</option>
          <option value="weekend">Week-end</option>
        </select>

        {/* À propos */}
        <label className="text-sm">À propos :</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Parle-nous de toi"
          className="w-full rounded border px-3 py-2 mb-4"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white
                           hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement…" : "S’inscrire"}
        </button>

        {error && (
          <p className="text-center text-red-500 font-semibold mt-2">{error}</p>
        )}
      </form>

      {/* Modale de sélection des compétences */}
      {showModal && (
        <SkillModal
          selectedSkills={formData.skills}
          onClose={() => setShowModal(false)}
          onSave={(skills) => setFormData((p) => ({ ...p, skills }))}
        />
      )}
    </>
  );
}
