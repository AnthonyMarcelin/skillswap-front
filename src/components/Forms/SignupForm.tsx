import { useState } from "react";
import SkillModal from "../Skills/SkillModal";

export default function SignupForm() {
  // 🧠 État principal du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "", // Pour confirmer le mot de passe
    skills: [] as string[],
    availability: "",
    about: "",
    address: "",
    city: "",
    zip: "",
    category: "",
    photo: null as File | null, // fichier image
  });

  // 🧠 État pour ouvrir/fermer la modale de compétences
  const [showModal, setShowModal] = useState(false);

  // 🔁 Gestion des champs texte / select / textarea
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    {
      /* Gestion des espaces vides et echappe les caracteres spéciaux */
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: typeof value === "string" ? value.trimStart() : value,
    });
  };

  // 📷 Gestion du fichier photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.skills.length === 0) {
      alert("Veuillez sélectionner au moins une compétence !");
      return;
    }

      // ✅ Vérifie que les mots de passe correspondent
  if (formData.password !== formData.confirmPassword) {
    alert("❌ Les mots de passe ne correspondent pas.");
    return;
  }

    console.log("Inscription", formData);
    // Envoi API ici
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Titre du formulaire */}
        {/* <h1 className="m-2 text-center text-2xl font-bold">Ca commence ici !</h1>
        <h2 className="m-2 text-center text-xl font-bold">
          Inscrivez-vous pour partager vos compétences
        </h2> */}
        {/* Champ Prénom */}
        <input
          name="address"
          required
          minLength={3}
          maxLength={50}
          pattern="^[A-Za-zÀ-ÿ0-9\s,\-']{5,100}$" // Lettres, chiffres, virgule, tiret, apostrophe.
          placeholder="Adresse"
          value={formData.address}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />
        <input
          name="city"
          required
          minLength={3}
          maxLength={50}
          pattern="^[A-Za-zÀ-ÿ\s\-']{2,40}$" //Même règles que prénom/nom, mais jusqu’à 40 caractères.
          placeholder="Ville"
          value={formData.city}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />
        <input
          name="zip"
          required
          type="text"
          minLength={5}
          maxLength={10}
          pattern="^\d{5}$" // Exactement 5 chiffres
          placeholder="Code postal"
          value={formData.zip}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* 🔖 Catégorie */}
        <label className="block text-sm mb-1">Catégorie :</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        >
          <option value="">Choisir une catégorie</option>
          <option value="developpeur">Développeur</option>
          <option value="designer">Designer</option>
          <option value="chefprojet">Chef de projet</option>
        </select>

        {/* 🎯 Compétences */}
        <label className="block text-sm mb-1">Compétences :</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mb-3 w-full rounded border px-3 py-2 bg-[var(--color-primary)] text-[var(--color-secondary)] font-semibold hover:opacity-90"
        >
          Choisir mes compétences
        </button>

        {/* Bulles des compétences sélectionnées */}
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-full bg-[var(--color-secondary)] text-[var(--color-whitish)] px-4 py-1 text-sm shadow-sm hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* 🕒 Disponibilités */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Disponibilités :</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2 bg-white text-black"
          >
            <option value="">Choisir</option>
            <option value="available1">Semaine</option>
            <option value="available2">Week-end</option>
          </select>
        </div>

        {/* 🗣 À propos */}
        <label className="block text-sm mb-1">À propos :</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          className="mb-4 w-full resize-none rounded border px-3 py-2 bg-white text-black"
          placeholder="Parle-nous de toi"
        />

        {/* 🚀 Envoi */}
        <button
          type="submit"
          className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90"
        >
          S’inscrire
        </button>
      </form>

      {/* 📦 Modale compétences */}
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
