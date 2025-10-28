import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

/**
 * Reusable Action Button Component
 */
const ActionButton = ({ text, onClick, href, className = '' }) => {
  const ButtonContent = () => (
    <>
      <span>{text}</span>
      <FaArrowRight />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`action-button ${className}`}>
        <ButtonContent />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`action-button ${className}`}>
      <ButtonContent />
    </button>
  );
};

export default ActionButton;

