import React from "react";

export default function SearchForm() {
  async function handleSearch(formData: FormData) {
    const competence = formData.get("competence") as string;
    const codePostal = formData.get("codePostal") as string;
    // Ici, tu peux remplacer l'alerte par ta logique métier
    alert(
      `Recherche lancée pour la compétence : "${competence}" et le code postal : "${codePostal}"`
    );
  }

    const competences = [
    "Développement Web",
    "Design UX/UI",
    "Marketing Digital",
    "Gestion de Projet",
    "Data Science",
  ];

  return (
    <form
      action={handleSearch}
      className="mt-10 bg-primary shadow p-8 m-5"
    >
      <h2 className="text-lg font-semibold mb-6 text-center text-secondary">
        Trouvez des nouvelles compétences proches de chez vous
      </h2>
      <div className="mb-4">
      <select
          name="competence"
          className="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-accent"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Sélectionner une compétence
          </option>
          {competences.map((comp) => (
            <option key={comp} value={comp} className="text-secondary">
              {comp}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="codePostal"
          placeholder="Code postal"
          className="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Rechercher
      </button>
    </form>
  );
}
