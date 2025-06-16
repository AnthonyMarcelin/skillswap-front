
import { CarouselPlugin } from "./ui/CarouselPlugin";
import SearchForm from "./Forms/SearchForm";
import SkillBubble from "./ui/SkillBubble";
import ProfileBubble from "./ui/ProfileBubble";
import WishToRegister from "./WishToRegister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "@/types/user";
import { useAllUsers } from "@/hooks/useAllUsers";

export default function Homepage() {
   const [users, setUsers] = useState<IUser[]>([]);
   const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
   const navigate = useNavigate();
  // Utilisation du hook personnalisé pour récupérer tous les utilisateurs
  useAllUsers();

    function handleSearch({ skill, zipcode}: { skill: string; zipcode: string }) {
      const filtered = users.filter((user) =>
        user.skills.some((s) => s.name === skill) &&
        user.zipcode === zipcode
);
      setFilteredUsers(filtered);
      navigate("/search", { state: { filteredUsers: filtered } });
    }

  return (
   
    <div className="w-full">
      <CarouselPlugin />

      <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
        <div className="text-center text-lg p-6 font-bold">
          “Apprenez gratuitement ce que vous ne savez pas encore, en donnant ce
          que vous maîtrisez déjà.”
        </div>
        <SearchForm onSearch={handleSearch} />
        <div className="pt-10 items-start text-lg font-semibold">
          Top compétences
        </div>
        <SkillBubble />
      </section>
      <WishToRegister />
      <section className="flex flex-col items-center min-h-auto bg-primary text-white m-0 pt-5 pb-10">
        <div className="pt-8 text-secondary text-lg text-center items-start font-semibold">
          Les derniers profils inscrits
        </div>
        <ProfileBubble />
      </section>   
    </div>
  );
}
