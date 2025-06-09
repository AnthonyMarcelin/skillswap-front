import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header-container flex justify-between items-center p-2 bg-blue-500 text-white">
      <h1>SkillSwap</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;