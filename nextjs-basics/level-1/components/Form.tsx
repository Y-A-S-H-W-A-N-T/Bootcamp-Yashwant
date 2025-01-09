import React, { FormEvent, ReactNode, useState } from 'react';

type FormProps = {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title?: string;
  subtitle?: string;
};

const Form: React.FC<FormProps> = ({ 
  children, 
  onSubmit, 
  title,
  subtitle 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <form 
      onSubmit={onSubmit} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        max-w-md
        mx-auto
        p-6 md:p-8
        bg-white dark:bg-slate-900
        border border-gray-200 dark:border-gray-800
        rounded-xl
        shadow-lg
        transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-[-2px]' : ''}
      `}
    >
      {/* Gradient Background Effect */}
      <div className={`
        absolute 
        inset-0 
        bg-gradient-to-r 
        from-blue-100 dark:from-blue-900/20 
        to-purple-100 dark:to-purple-900/20 
        opacity-0 
        rounded-xl
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : ''}
      `} />

      {/* Content Container */}
      <div className="relative space-y-6">
        {/* Form Header */}
        {(title || subtitle) && (
          <div className="space-y-2 mb-6">
            {title && (
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className={`
        absolute 
        bottom-0 
        left-0 
        right-0 
        h-0.5 
        bg-gradient-to-r 
        from-blue-500 
        to-purple-500
        opacity-0
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : ''}
      `} />
    </form>
  );
};

export default Form;