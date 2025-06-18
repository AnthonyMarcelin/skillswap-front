import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./ui/Logo";
import { useAuth } from "@/hooks/useAuth";
import { getUserById } from "@/services/user.service";
import type { IUser } from "@/types/user";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [authUser, setAuthUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await getUserById($"authUserId"); // Remplacez "authUserId" par la méthode pour obtenir l'ID de l'utilisateur authentifié
        setAuthUser(userId);
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur : ", error);
      }
    };
    fetchUser();
  }, []);

  const location = useLocation(); // Donne accès à l'URL actuelle

  // On vérifie si on est déjà sur la page perso pour ne pas afficher le lien
  const isOnPersonalPage = location.pathname === "/personalpage";
  const { isAuthenticated } = useAuth();

  return (
    <header className="header-container relative flex flex-col w-full">
      <div className="flex justify-between items-center p-2 bg-white text-white">
    {/* Conteneur logo + titre côte à côte */}
    <div className="flex items-center">
      <Link to="/">
        <Logo />
      </Link>
      <Link to="/" className="flex flex-col ml-0">
        <h1 className="text-secondary font-semibold text-4xl leading-none">
          SkillSwap
        </h1>
        <h2 className="text-secondary text-lg leading-none">
          Partagez vos talents, découvrez ceux des autres
        </h2>
      </Link>
    </div>

        {/* Bouton burger pour le menu mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center ml-4"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-secondary rounded"></span>
        </button>

        {/* Menu en version desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-4">

            {/* <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/">Accueil</Link>
            </Button> */}
{/* 
            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold"
            >
              <Link to="/register">Inscription</Link>
            </Button> */}

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
            >
              <Link to="/account">Mon profil</Link>
            </Button>

            <Button
              asChild
              className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
            >
              <Link to={`/messages/${authUser?.id}`}>Messagerie</Link>
            </Button>

            <Button asChild className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold">

              <Link to="/search">Rechercher</Link>
            </Button>
            
            <Button
      asChild
      className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold"
    >
      <Link to="/register">Se connecter</Link>
    </Button>

    {/* Affichage "Mon profil" si connecté et pas sur la page perso */}
    {isAuthenticated && !isOnPersonalPage && (
      <Button asChild className="bg-accent hover:bg-secondary text-white px-3 py-1 text-lg font-semibold">
        <Link to="/personalpage">Mon profil</Link>
      </Button>
    )}

  </ul>
</nav>
      </div>

       {/* Menu mobile (visible quand on clique sur le burger) */}
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

            <li><Link to="/" onClick={() => setOpen(false)}>Accueil</Link></li>
            <li><Link to="/register" onClick={() => setOpen(false)}>Connexion / Inscription</Link></li>

            {/* ➕ Idem dans le menu mobile : seulement si connecté */}
            {isAuthenticated && !isOnPersonalPage && (
              <li>
                <Link to="/personalpage" onClick={() => setOpen(false)}>Mon compte</Link>
              </li>
            )}

            <li><Link to="/search" onClick={() => setOpen(false)}>Rechercher</Link></li>

          </ul>
        </nav>
      )}
    </header>
  );
}