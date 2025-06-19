// Import des hooks, services et types nécessaires
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillModal from "../Skills/SkillModal";
import { register } from "@/services/auth.service";
import { useAsyncState } from "@/hooks/useAsyncState";
import type { SignupFormData } from "@/types/form.types";
import { mapFormDataToRegisterDto } from "@/types/dto.types";
import AvatarPicker from "../AvatarPicker";
import Modal from "../ui/Modal";

export default function SignupForm() {
  // Contenu du formulaire
  const [formData, setFormData] = useState<SignupFormData & { avatarUrl?: string }>({
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
    avatarUrl: undefined,
  });

  // Ouverture des modales, état de chargement, gestion des erreurs
  const [showModal, setShowModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  // Pour pouvoir enlever l'avatar lors de l'inscription si on change d'avis
  const [previousAvatar, setPreviousAvatar] = useState<string | undefined>(undefined);

   // Ouvrir la modale avatar
   const openAvatarModal = () => {
    setPreviousAvatar(formData.avatarUrl); // mémoriser l'avatar actuel
    setShowAvatarModal(true);
  };
  
  const closeAvatarModal = () => {
    // Si on ferme sans changement, on efface le choix précédent
    if (formData.avatarUrl === previousAvatar || !formData.avatarUrl) {
      setFormData((prev) => ({ ...prev, avatarUrl: undefined }));
    }
    setShowAvatarModal(false);
  };

  const { loading, error, setLoading, setError, reset } = useAsyncState();
  const navigate = useNavigate();

  // Gère les champs texte, sélection et zone texte
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
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
      <form onSubmit={handleSubmit} className="space-y-6 px-4 max-w-4xl mx-auto">
  {/* Container responsive */}
  <div className="flex flex-col lg:grid lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
    {/* Avatar */}
    <div className="flex flex-col items-center gap-3">
          {formData.avatarUrl ? (
            <img
              src={formData.avatarUrl}
              alt="Avatar sélectionné"
              className="w-[180px] h-[180px] rounded-md object-cover shadow"
            />
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center rounded-md bg-gray-300 text-gray-600 shadow">
              Aucun avatar
            </div>
          )}
          <button
            type="button"
            onClick={openAvatarModal} // utilise la nouvelle fonction ici
            className="rounded border px-4 py-2 bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            Choisir un avatar
          </button>
        </div>

    {/* Champs généraux */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        className="sm:col-span-2 rounded border px-3 py-2 bg-white text-black"
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
        className="sm:col-span-2 rounded border px-3 py-2 bg-white text-black"
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
        className="sm:col-span-2 rounded border px-3 py-2 bg-white text-black"
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
  <input
    name="zip"
    value={formData.zip}
    onChange={handleChange}
    placeholder="Code postal"
    required
    className="w-full rounded border px-3 py-2 bg-white text-black"
  />
  <input
    name="city"
    value={formData.city}
    onChange={handleChange}
    placeholder="Ville"
    required
    className="w-full rounded border px-3 py-2 bg-white text-black"
  />

  {/* Compétences */}
  <label className="text-sm mb-1 block">Compétences :</label>
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
          className="inline-block bg-[var(--color-primary)] text-[var(--color-whitish)] rounded-full px-4 py-1 text-sm"
        >
          {s}
        </span>
      ))}
    </div>
  )}

  {/* Disponibilités */}
  <label className="text-sm mb-1 block">Disponibilités :</label>
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

  {/* À propos */}
  <label className="text-sm mb-1 block">À propos :</label>
  <textarea
    name="about"
    rows={3}
    value={formData.about}
    onChange={handleChange}
    placeholder="Parle-nous de toi"
    className="w-full resize-none rounded border px-3 py-2 bg-white text-black mb-4"
  />

  {/* Submit */}
  <button
    type="submit"
    disabled={loading}
    className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90 disabled:opacity-50"
  >
    {loading ? "Enregistrement…" : "S’inscrire"}
  </button>

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

      {/* Modale AvatarPicker */}
      {showAvatarModal && (
        <Modal onClose={closeAvatarModal}>
          <AvatarPicker
            selectedUrl={formData.avatarUrl ?? null}
            onSelect={(url) => {
              setFormData((prev) => ({ ...prev, avatarUrl: url }));
              setShowAvatarModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
