{/* Pour l'instant récupération données en dur */}

import { useState, useEffect } from 'react';

// Props attendues par le composant SkillSelector
type Props = {
  selectedSkills: string[];           // Liste des compétences déjà sélectionnées
  onChange: (skills: string[]) => void; // Fonction à appeler quand la liste change
};

// Données statiques : catégories avec les compétences associées
const skillsByCategory = {
  frontend: ['HTML', 'CSS', 'React', 'Vue'],
  backend: ['Node.js', 'Express', 'Python', 'Java'],
  devops: ['Docker', 'Kubernetes', 'CI/CD', 'AWS']
};

export default function SkillSelector({ selectedSkills, onChange }: Props) {
  // État local pour suivre la catégorie actuellement sélectionnée
  const [category, setCategory] = useState('frontend');

  // Fonction appelée lorsqu'on coche ou décoche une compétence
  const handleCheckboxChange = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      // Si la compétence est déjà sélectionnée, on la retire
      ? selectedSkills.filter((s) => s !== skill)
      // Sinon, on l’ajoute à la liste
      : [...selectedSkills, skill];

    // On remonte la nouvelle liste des compétences au parent via onChange
    onChange(updated);
  };

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* --- Colonne gauche : sélection des compétences --- */}
      <div>
        {/* Choix de la catégorie (frontend, backend, devops) */}
        <label className="block text-sm font-medium mb-2">Catégorie :</label>
        <select
          value={category}                            // Catégorie actuelle
          onChange={(e) => setCategory(e.target.value)} // Met à jour l'état local
          className="mb-4 w-full rounded border px-3 py-2 bg-white text-black"
        >
          {/* Génération des options depuis les clés de l’objet skillsByCategory */}
          {Object.keys(skillsByCategory).map((cat) => (
            <option key={cat} value={cat}>
              {/* On affiche la catégorie avec la première lettre en majuscule */}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Liste des compétences liées à la catégorie sélectionnée */}
        <fieldset className="space-y-2">
          {skillsByCategory[category].map((skill) => (
            <label key={skill} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}   // Si déjà sélectionnée, coche la case
                onChange={() => handleCheckboxChange(skill)} // Gère l'ajout ou le retrait
                className="accent-[var(--color-accent)]" // Couleur personnalisée (orange)
              />
              {skill}
            </label>
          ))}
        </fieldset>
      </div>

      {/* --- Colonne droite : affichage des compétences sélectionnées --- */}
      <div>
        <h3 className="font-semibold mb-2">Compétences sélectionnées :</h3>

        {/* Affichage conditionnel : aucune sélection → message d'information */}
        {selectedSkills.length === 0 ? (
          <p className="italic text-sm text-gray-300">
            Aucune compétence sélectionnée
          </p>
        ) : (
          // Sinon, on liste les compétences sélectionnées
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-full bg-[var(--color-primary)] text-[var(--color-secondary)] px-4 py-1 text-sm shadow-sm hover:scale-105 transition-transform duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
