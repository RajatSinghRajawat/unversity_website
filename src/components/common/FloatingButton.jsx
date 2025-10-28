import React from 'react';

/**
 * Reusable Floating Button Component
 */
const FloatingButton = ({ icon: Icon, title, onClick, className = '' }) => {
  return (
    <button 
      className={`floating-button ${className}`} 
      title={title}
      onClick={onClick}
    >
      <Icon size={24} />
    </button>
  );
};

export default FloatingButton;

