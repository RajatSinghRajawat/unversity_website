import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

/**
 * Reusable Card Component
 */
const Card = ({ 
  image, 
  title, 
  desc, 
  showArrow = false,
  isHovered = false,
  onHover,
  onLeave,
  className = '',
  imageHeight = 'h-64',
  big = false
}) => {
  return (
    <div
      className={`card ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`card-image ${big ? 'h-80' : imageHeight}`}
        />
        {showArrow && (
          <button
            className={`absolute bottom-4 right-4 bg-yellow-400 text-black p-2 rounded-full shadow-lg transform transition-all duration-300 ${
              isHovered
                ? 'rotate-45 opacity-100 scale-110'
                : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <FaArrowRight size={20} />
          </button>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {desc && <p className="card-desc">{desc}</p>}
      </div>
    </div>
  );
};

export default Card;

