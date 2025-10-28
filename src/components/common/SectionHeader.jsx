import React from 'react';

/**
 * Reusable Section Header Component
 */
const SectionHeader = ({ title, subtitle }) => {
  return (
    <>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </>
  );
};

export default SectionHeader;

