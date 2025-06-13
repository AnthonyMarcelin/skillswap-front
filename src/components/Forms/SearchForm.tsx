import React, { useEffect, useState } from "react";
import axios from "axios";

type SearchFormProps = {
  onSearch: (data: { skill: string; zipcode: string }) => void;
  className?: string;
};

export default function SearchForm({onSearch, className = ""}: SearchFormProps) {
const [skills, setSkills] = useState<{id: number; name: string}[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/skills/");

        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill = formData.get("skill") as string;
    const zipcode = formData.get("zipcode") as string;
    onSearch({ skill, zipcode });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 bg-primary shadow p-8 m-5 $ ${className}`}
    >
      <h2 className="text-lg font-semibold mb-6 text-center text-secondary">
        Trouvez des nouvelles compétences proches de chez vous
      </h2>
      <div className="mb-4">
        <select
          name="skill"
          className="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-accent"
          defaultValue=""
        >
          <option value="" disabled>
            Sélectionner une compétence
          </option>
          {skills.map((skill, idx) => (
            <option key={`${skill.name}-${idx}`} value={skill.name} className="text-secondary">
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <input
          type="text"
          name="zipcode"
          placeholder="Code postal"
          className="w-full px-4 py-2 border border-white rounded focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-white"

        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent hover:bg-secondary text-white font-semibold py-2 rounded transition"
      >
        Rechercher
      </button>
    </form>
  );
}
