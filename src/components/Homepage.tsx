import React from "react";
import { CarouselPlugin } from "./ui/carouselPlugin";
import SearchForm from "./SearchForm";
import Pastille from "./ui/SkillBubble";

export default function Homepage () {
  return (
    <>
      <CarouselPlugin />

      <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5"> 
        <div className="text-center p-6 font-bold">“Apprenez gratuitement ce que vous ne savez pas encore, en donnant ce que vous maîtrisez déjà.”</div>
        <SearchForm />
        <div className="pt-8 items-start font-semibold">Top compétences</div>
        <Pastille />
      </section>
    </>
  );
};
