import{ useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header-container relative flex flex-col w-full">
      <div className="flex justify-between items-center p-2 bg-primary text-white">
      {/* Logo SVG */}
      <Link to="/">
          <svg className="w18 h-18" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
//           <line x1="80" y1="20" x2="120" y2="40" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="120" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="80" y2="100" stroke="#24305E" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="40" y2="80" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="40" y2="40" stroke="#BF350B" stroke-width="1.5"></line>

//           <line x1="120" y1="40" x2="120" y2="80" stroke="#24305E" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="80" y2="100" stroke="white" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="40" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <line x1="120" y1="80" x2="80" y2="100" stroke="white" stroke-width="1.5"></line>
//           <line x1="120" y1="80" x2="40" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="120" y1="80" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <line x1="80" y1="100" x2="40" y2="80" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="100" x2="40" y2="40" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="40" y1="80" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <circle cx="80" cy="20" r="7" fill="#24305E"></circle>
//           <circle cx="120" cy="40" r="7" fill="white"></circle>
//           <circle cx="120" cy="80" r="7" fill="#BF350B"></circle>
//           <circle cx="80" cy="100" r="7" fill="white"></circle>
//           <circle cx="40" cy="80" r="7" fill="#BF350B"></circle>
//           <circle cx="40" cy="40" r="7" fill="#24305E"></circle>
//         </svg>
      </Link>
      {/* Title and subtitle */}
      {/* Uncomment the following lines if you want to display the title and subtitle */}
      {/* {!open && ( */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-60 pointer-events-none z-20">
          <h1 className="font-bold text-2xl text-center w-full">SkillSwap</h1>
          <h2 className="text-sm text-center w-full">
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
          <span className="block w-8 h-1 bg-white mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-white mb-1 rounded"></span>
          <span className="block w-8 h-1 bg-white rounded"></span>
        </button>
        {/* Menu desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-4">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/register">Se connecter/S'inscrire</Link></li>
            <li><Link to="/">Mon compte</Link></li>
            <li><Link to="/search">Rechercher</Link></li>
          </ul>
        </nav>
      </div>
      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden bg-secondary text-white w-full z-10 absolute left-0 top-20">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li><Link to="/" onClick={() => setOpen(false)}>Accueil</Link></li>
            <li><Link to="/register" onClick={() => setOpen(false)}>Se connecter/S'inscrire</Link></li>
            <li><Link to="/myprofile" onClick={() => setOpen(false)}>Mon compte</Link></li>
            <li><Link to="/search" onClick={() => setOpen(false)}>Rechercher</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

//  <header className="header-container relative flex flex-col">
//       <div className="flex justify-between items-center p-2 bg-primary text-white">
//         <svg width="400" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
//           <line x1="80" y1="20" x2="120" y2="40" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="120" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="80" y2="100" stroke="#24305E" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="40" y2="80" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="20" x2="40" y2="40" stroke="#BF350B" stroke-width="1.5"></line>

//           <line x1="120" y1="40" x2="120" y2="80" stroke="#24305E" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="80" y2="100" stroke="white" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="40" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="120" y1="40" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <line x1="120" y1="80" x2="80" y2="100" stroke="white" stroke-width="1.5"></line>
//           <line x1="120" y1="80" x2="40" y2="80" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="120" y1="80" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <line x1="80" y1="100" x2="40" y2="80" stroke="white" stroke-width="1.5"></line>
//           <line x1="80" y1="100" x2="40" y2="40" stroke="#BF350B" stroke-width="1.5"></line>
//           <line x1="40" y1="80" x2="40" y2="40" stroke="#24305E" stroke-width="1.5"></line>

//           <circle cx="80" cy="20" r="7" fill="#24305E"></circle>
//           <circle cx="120" cy="40" r="7" fill="white"></circle>
//           <circle cx="120" cy="80" r="7" fill="#BF350B"></circle>
//           <circle cx="80" cy="100" r="7" fill="white"></circle>
//           <circle cx="40" cy="80" r="7" fill="#BF350B"></circle>
//           <circle cx="40" cy="40" r="7" fill="#24305E"></circle>
//         </svg>
//         <div className="flex flex-col ">
//         <h1 className="font-bold text-2xl">SkillSwap</h1>
//         <h2>Partagez vos talents, découvrez ceux des autres</h2>
//         </div>
//         <nav>
//           <ul className="flex gap-4">
//             <li><a href="/">Home</a></li>
//             <li><a href="/about">About</a></li>
//             <li><a href="/contact">Contact</a></li>
//           </ul>
//         </nav>
//       </div>

//     </header>
