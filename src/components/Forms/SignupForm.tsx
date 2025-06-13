// Import des hooks, services et types nécessaires
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillModal from "../Skills/SkillModal";
import { register } from "@/services/auth.service";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { SignupFormData } from "@/types/form.types";
import { mapFormDataToRegisterDto } from "@/types/dto.types";

export default function SignupForm() {
  // Contenu du formulaire
  const [formData, setFormData] = useState<SignupFormData>({
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

  // Ouverture de la modale, état de chargement, gestion des erreurs
  const [showModal, setShowModal] = useState(false);
  const { loading, error, setLoading, setError, reset } = useAsyncState();
  const navigate = useNavigate();

  // Gère les champs texte, sélection et zone texte
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  // Gère l’ajout de la photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  // Quand on valide le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifie s’il y a au moins une compétence
    if (formData.skills.length === 0) {
      alert("Veuillez sélectionner au moins une compétence !");
      return;
    }

    // Vérifie si les mots de passe sont identiques
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Transforme les données du formulaire en données pour l’API
    const dto = mapFormDataToRegisterDto(formData);

    try {
      reset();
      setLoading(true);
      await register(dto);
      navigate("/search"); // Redirige après succès
    } catch (err: any) {
      const msg = err.response?.data?.message ?? "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Partie photo + infos générales */}
        <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-6">
          <div className="flex flex-col items-center gap-3">
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Aperçu"
                className="w-[220px] h-[220px] rounded-md object-cover shadow"
              />
            ) : (
              <div className="w-[220px] h-[220px] flex items-center justify-center rounded-md bg-gray-300 text-gray-600 shadow">
                Photo
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              required
              className="rounded border px-3 py-2 bg-white text-black"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nom"
              required
              className="rounded border px-3 py-2 bg-white text-black"
            />
            <input
              name="email"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="col-span-2 rounded border px-3 py-2 bg-white text-black"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              autoComplete="new-password"
              required
              minLength={8}
              className="col-span-2 rounded border px-3 py-2 bg-white text-black"
            />
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmer"
              autoComplete="new-password"
              required
              minLength={8}
              className="col-span-2 rounded border px-3 py-2 bg-white text-black"
            />
          </div>
        </div>

        {/* Adresse complète */}
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresse"
          required
          className="w-full rounded border px-3 py-2 bg-white text-black"
        />
        <div className="grid grid-cols-3 gap-4">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ville"
            required
            className="col-span-2 rounded border px-3 py-2 bg-white text-black"
          />
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Code postal"
            required
            className="rounded border px-3 py-2 bg-white text-black"
          />
        </div>

        {/* Catégorie métier */}
        <label className="text-sm mb-1">Catégorie :</label>
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

        {/* Compétences à choisir via modale */}
        <label className="text-sm mb-1">Compétences :</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="w-full rounded border px-3 py-2 bg-[var(--color-primary)] text-[var(--color-secondary)] font-semibold hover:opacity-90 mb-3"
        >
          Choisir mes compétences
        </button>

        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((s) => (
              <span
                key={s}
                className="inline-block bg-[var(--color-secondary)] text-[var(--color-whitish)] rounded-full px-4 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Disponibilités */}
        <label className="text-sm mb-1">Disponibilités :</label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 bg-white text-black mb-4"
        >
          <option value="">Choisir</option>
          <option value="weekdays">Semaine</option>
          <option value="weekend">Week-end</option>
        </select>

        {/* Présentation de soi */}
        <label className="text-sm mb-1">À propos :</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Parle-nous de toi"
          className="w-full resize-none rounded border px-3 py-2 bg-white text-black mb-4"
        />

        {/* Bouton pour s’inscrire */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement…" : "S’inscrire"}
        </button>

        {/* Erreur affichée si besoin */}
        {error && (
          <p className="text-center text-red-500 font-semibold mt-2">{error}</p>
        )}
      </form>

      {/* Modale d’ajout de compétences */}
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
