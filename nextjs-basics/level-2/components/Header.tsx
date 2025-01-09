"use client";

import React from "react";
import ThemeToggle from "./theme-toggle";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Greetings!!!</h1>
      <ThemeToggle />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;