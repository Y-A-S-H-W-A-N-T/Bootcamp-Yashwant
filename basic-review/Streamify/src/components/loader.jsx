// src/components/ui/loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export { Loader };
