import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

/**
 * Reusable Mobile Accordion Component
 */
const MobileAccordion = ({ title, isOpen, onToggle, children }) => {
  return (
    <li>
      <span
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-blue-900 hover:text-white"
        onClick={onToggle}
      >
        {title}{' '}
        <FaChevronDown
          className={`ml-1 text-sm transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </span>
      {isOpen && <ul className="pl-4 space-y-2">{children}</ul>}
    </li>
  );
};

export default MobileAccordion;

