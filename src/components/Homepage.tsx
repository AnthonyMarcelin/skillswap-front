import React from "react";
import { CarouselPlugin } from "./ui/carouselPlugin";
import SearchForm from "./Forms/SearchForm";
import SkillBubble from "./ui/SkillBubble";
import ProfileBubble from "./ui/ProfileBubble";
import WishToRegister from "./WishToRegister";

export default function Homepage() {
  return (
    <>
      <CarouselPlugin />

      <section className="flex flex-col items-center min-h-screen bg-secondary text-white m-0 pt-5">
        <div className="text-center text-lg p-6 font-bold">
          “Apprenez gratuitement ce que vous ne savez pas encore, en donnant ce
          que vous maîtrisez déjà.”
        </div>
        <SearchForm />
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
<<<<<<< HEAD
      </section>
      <Footer />
=======
      </section>   
>>>>>>> fc6c6a0077ebcbe91899e68210640c28f1a99c26
    </>
  );
}
