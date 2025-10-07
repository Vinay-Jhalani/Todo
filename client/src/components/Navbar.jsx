import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <img
            src="/Simple-Modern-Minimalist-Circle-Design-Studio-Logo-1.06-x-1.06-cm.png"
            alt="Logo"
          />
          <span>Skillion Todo</span>
        </div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
