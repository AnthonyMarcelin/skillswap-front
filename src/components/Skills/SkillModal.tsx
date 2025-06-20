import { useState } from "react";
// Import du composant de sélection des compétences
import SkillSelector from "../Skills/SkillSelector";

// Définition des props attendues par la modale
type Props = {
  selectedSkills: string[]; // Liste des compétences déjà sélectionnées (venant du parent)
  onClose: () => void; // Fonction pour fermer la modale sans sauvegarder
  onSave: (skills: string[]) => void; // Fonction pour sauvegarder la sélection
};

export default function SkillModal({ selectedSkills, onClose, onSave }: Props) {
  // Modale d’ajout/modification de compétences
  const [localSkills, setLocalSkills] = useState<string[]>(selectedSkills);

  // Validation : envoie les compétences au parent et ferme la modale
  const handleSave = () => {
    onSave(localSkills); // Envoie les compétences sélectionnées au parent
    onClose(); // Ferme la modale
  };

  return (
    // Fond noir semi-transparent en plein écran
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Contenu de la modale centré à l'écran */}
      <div className="bg-[var(--color-whitish)] text-black rounded-2xl shadow-lg max-w-2xl w-full p-6 animate-fade-in">
        {/* Titre de la modale */}
        <h2 className="text-xl font-bold text-[var(--color-secondary)] mb-4 text-center">
          ✨ Sélection des compétences
        </h2>

        {/* Liste des compétences sélectionnables */}
        <SkillSelector
          selectedSkills={localSkills} // Liste temporaire affichée
          onChange={setLocalSkills} // Met à jour la liste locale
        />

        {/* Boutons de validation */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
          >
            Annuler
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[var(--color-accent)] text-white hover:opacity-90"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
