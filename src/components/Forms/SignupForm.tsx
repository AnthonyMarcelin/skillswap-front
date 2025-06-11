import { useState } from 'react';
import SkillModal from '../Skills/SkillModal';

export default function SignupForm() {
  // État principal du formulaire
  const [formData, setFormData] = useState({
    firstName: '',        
    lastName: '',         
    email: '',            
    password: '',         
    skills: [] as string[], 
    availability: '',  
    about: ''             
  });

  // État pour contrôler l'ouverture de la modale de sélection des compétences
  const [showModal, setShowModal] = useState(false);

  // Gestion des changements dans les champs standards du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire : ici on loggue les données, mais on pourrait appeler une API
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Inscription', formData); // Affiche les données en console (à remplacer par une requête API)
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
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* Champ Nom */}
        <input
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* Champ Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* Champ Mot de passe */}
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          className="mb-3 w-full rounded border px-3 py-2 bg-white text-black"
        />

        {/* Bouton pour ouvrir la modale de sélection des compétences */}
        <label className="block text-sm mb-1">Compétences :</label>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mb-3 w-full rounded border px-3 py-2 bg-[var(--color-primary)] text-[var(--color-secondary)] font-semibold hover:opacity-90"
        >
          Choisir mes compétences
        </button>

        {/* Affichage des compétences sélectionnées sous forme de bulles stylisées */}
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

        {/* Champ Disponibilité (select) */}
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

        {/* Champ À propos */}
        <label className="block text-sm mb-1">À propos :</label>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          className="mb-4 w-full resize-none rounded border px-3 py-2 bg-white text-black"
          placeholder="Parle-nous de toi"
        />

        {/* Bouton d'envoi du formulaire */}
        <button
          type="submit"
          className="w-full rounded bg-[var(--color-accent)] py-2 font-semibold text-white hover:opacity-90"
        >
          S’inscrire
        </button>
      </form>

      {/* Modale de sélection des compétences */}
      {showModal && (
        <SkillModal
          selectedSkills={formData.skills} // Compétences actuelles à afficher dans la modale
          onClose={() => setShowModal(false)} // Fermeture de la modale
          onSave={(skills) =>
            setFormData((prev) => ({ ...prev, skills })) // Mise à jour du state global à la validation
          }
        />
      )}
    </>
  );
}
