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
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
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

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas.");
      return;
    }

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
      const msg = err.response?.data?.message ?? "Erreur inconnue";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* GRILLE photo + identité */}
        <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-6">
          {/* photo */}
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

          {/* champs identité */}
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

        {/* adresse / ville / zip */}
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
            // pattern="\\d{5}"
            className="rounded border px-3 py-2 bg-white text-black"
          />
        </div>

        {/* catégorie */}
        <label className="text-sm mb-1">Catégorie&nbsp;:</label>
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

        {/* compétences */}
        <label className="text-sm mb-1">Compétences&nbsp;:</label>
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

        {/* disponibilités */}
        <label className="text-sm mb-1">Disponibilités&nbsp;:</label>
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

        {/* à propos */}
        <label className="text-sm mb-1">À propos&nbsp;:</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Parle-nous de toi"
          className="w-full resize-none rounded border px-3 py-2 bg-white text-black mb-4"
        />

        {/* bouton submit */}
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

      {/* modale compétences */}
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
