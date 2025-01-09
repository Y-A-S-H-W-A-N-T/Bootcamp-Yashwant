import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="flex flex-col space-y-2">
    {label && <label className="text-sm font-medium">{label}</label>}
    <input
      {...props}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

export default Input;