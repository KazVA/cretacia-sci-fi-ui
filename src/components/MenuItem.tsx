
import React from 'react';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  delay: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, delay }) => {
  return (
    <button 
      className="menu-option font-exo text-sm md:text-base text-bone-white/90 tracking-wider"
      onClick={onClick}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {label}
    </button>
  );
};

export default MenuItem;
