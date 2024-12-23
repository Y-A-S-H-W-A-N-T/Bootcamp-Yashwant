// src/components/ui/button.jsx
import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200 flex"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };