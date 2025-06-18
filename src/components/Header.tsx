import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import Logo from "./ui/Logo";

import { getUserById } from "@/services/user.service";
import type { IUser } from "@/types/user";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [authUser, setAuthUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await getUserById("21");
        setAuthUser(userId);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur : ", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="header-container relative flex flex-col w-full">
      <div className="flex justify-between items-center p-2 bg-white text-white">
        {/* Logo SVG */}
        <Link to="/">
          <Logo />
        </Link>
        {/* Title and subtitle */}
        {/* Uncomment the following lines if you want to display the title and subtitle */}
        {/* {!open && ( */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-60 pointer-events-none z-20">
          <h1 className=" text-secondary font-semibold text-2xl text-center w-full">
            SkillSwap
          </h1>
          <h2 className="text-secondary text-sm text-center w-full">
            Partagez vos talents, découvrez ceux des autres
          </h2>
        </div>
        {/* )} */}
        {/* Burger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center ml-4"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary rounded"></span>
        </button>
        {/* Menu desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-4">
            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/">Accueil</Link>
            </Button>

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/register">Inscription</Link>
            </Button>

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/account">Mon compte</Link>
            </Button>

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to={`/messages/${authUser?.id || "21"}`}>Messagerie</Link>
            </Button>

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/search">Rechercher</Link>
            </Button>
          </ul>
        </nav>
      </div>
      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden bg-secondary text-white w-full z-10 absolute left-0 top-20">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setOpen(false)}>
                Connexion / Inscription
              </Link>
            </li>
            <li>
              <Link to="/myprofile" onClick={() => setOpen(false)}>
                Mon compte
              </Link>
            </li>
            <li>
              <Link
                to={`/messages/${authUser?.id || "21"}`}
                onClick={() => setOpen(false)}
              >
                Messagerie
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={() => setOpen(false)}>
                Rechercher
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
