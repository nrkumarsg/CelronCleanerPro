import React from 'react';
import logoImg from '../assets/logo.png';

export const CelronLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src={logoImg} 
        alt="Celron Enterprises PTE LTD" 
        className="max-w-full max-h-full object-contain"
        style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' }}
      />
    </div>
  );
};
