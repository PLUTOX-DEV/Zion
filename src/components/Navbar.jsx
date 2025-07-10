import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-400 rounded-sd shadow">
      <ul className="flex px-4 py-2 justify-around">
        <li>
          <a
            href="/"
            className="text-white hover:text-blue-900 font-medium"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#menu"
            className="text-white hover:text-blue-900 font-medium"
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-white hover:text-blue-900 font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-white hover:text-blue-900 font-medium"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
