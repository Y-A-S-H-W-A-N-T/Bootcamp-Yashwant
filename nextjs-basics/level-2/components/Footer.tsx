"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 Branding. All rights reserved.</p>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:underline">
              Terms of Service
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;