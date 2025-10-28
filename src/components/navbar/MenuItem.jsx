import React from 'react';

/**
 * Reusable Menu Item Component
 */
const MenuItem = ({ text, onClick }) => {
  return (
    <li>
      <span 
        className="block hover:bg-blue-900 hover:text-white px-2 py-1 cursor-pointer text-black text-base font-semibold"
        onClick={onClick}
      >
        {text}
      </span>
    </li>
  );
};

export default MenuItem;

