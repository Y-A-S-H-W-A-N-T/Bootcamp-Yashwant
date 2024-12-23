// src/components/ui/select.jsx
import React from 'react';

const Select = ({ children, onValueChange, defaultValue }) => {
  return (
    <select
      className="px-4 py-2 rounded-xl border border-neutral-600 bg-gray-900"
      onChange={(e) => onValueChange(e.target.value)}
      defaultValue={defaultValue}
    >
      {children}
    </select>
  );
};

const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export { Select, SelectItem };
