// src/components/ui/input.jsx
import React from 'react';

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="px-4 py-2 bg-gray-900 rounded-xl border border-neutral-600"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export { Input };
