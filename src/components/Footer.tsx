import { Link } from "react-router-dom";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-secondary text-center p-6 pb-0 mb-0">
      <div className="flex gap-2 justify-center items-center mb-2">
        <Logo />
        <div className="text-lg font-semibold">SkillSwap</div>
      </div>
      <div className="mt-2 flex flex-col gap-2 mb-2">
        <Link to="/privacy" className="text-secondary hover:text-accent">
          Politique de confidentialité
        </Link>
        <Link to="/terms" className="text-secondary hover:text-accent ml-2">
          Mentions légales
        </Link>
      </div>
      <div className="text-sm mb-0">
        © {new Date().getFullYear()} Tous droits réservés Maxime.M Anthony.M Karine.D Ludovic.F
      </div>
    </footer>
  );
}
