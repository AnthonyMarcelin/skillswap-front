import React from "react";

const Header: React.FC = () => {
  return (
 <header className="header-container relative flex flex-col">
      <div className="flex justify-between items-center p-2 bg-primary text-white">
        <h1>SkillSwap</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>

    </header>
  );
}

export default Header;