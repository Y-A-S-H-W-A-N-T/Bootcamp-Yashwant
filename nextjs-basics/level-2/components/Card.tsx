import React, { ReactNode, useEffect, useState } from 'react';

type CardProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
};

const Card: React.FC<CardProps> = ({ 
  children, 
  title = "Welcome!", 
  subtitle = "We're glad you're here",
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto close functionality
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Wait for exit animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  return (
    <div className={`
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      z-50
      transition-all
      duration-300
      transform
      w-full
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}>
      <div className="relative overflow-hidden max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
        
        <div className="relative p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          {/* Close Button */}
          {onClose && (
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}

          {/* Header Section */}
          <div className="mb-4 space-y-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            {children}
          </div>

          {/* Progress bar for auto-close */}
          {autoClose && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
              <div 
                className={`
                  h-full
                  bg-gradient-to-r from-blue-500 to-purple-500
                  origin-left
                  animate-[shrink_${duration}ms_linear]
                `}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;