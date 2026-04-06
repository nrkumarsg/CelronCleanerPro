import React from 'react';

export const CelronLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 80" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ship Shape */}
      <path 
        d="M40 10 L40 30 L45 30 L45 0 L55 0 L55 30 L60 30 L60 10 L85 15 L95 40 L40 40 Z" 
        fill="#1e40af" 
      />
      
      {/* Waves */}
      <path 
        d="M40 45 Q50 40 60 45 Q70 50 80 45 Q90 40 100 45" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        fill="none" 
      />
      <path 
        d="M40 52 Q50 47 60 52 Q70 57 80 52 Q90 47 100 52" 
        stroke="#60a5fa" 
        strokeWidth="2" 
        fill="none" 
      />
      <path 
        d="M40 59 Q50 54 60 59 Q70 64 80 59 Q90 54 100 59" 
        stroke="#93c5fd" 
        strokeWidth="2" 
        fill="none" 
      />

      {/* Sun Gear */}
      <g transform="translate(25, 25)">
        {/* Gear teeth */}
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="-2"
            y="-22"
            width="4"
            height="8"
            fill="#ef4444"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="18" fill="#ef4444" />
        <circle r="14" fill="#fbbf24" />
        
        {/* Fan/Propeller */}
        <g fill="#000">
           <path d="M0 -10 Q5 -5 0 0 Q-5 -5 0 -10" />
           <path d="M10 0 Q5 5 0 0 Q5 -5 10 0" />
           <path d="M0 10 Q-5 5 0 0 Q5 5 0 10" />
           <path d="M-10 0 Q-5 -5 0 0 Q-5 5 -10 0" />
        </g>
      </g>
    </svg>
  );
};
