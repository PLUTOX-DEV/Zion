import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md">
      <ul className="flex px-4 py-3 justify-around">
        <li>
          <Link
            to="/"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-yellow-400 hover:text-yellow-300 font-medium transition"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
