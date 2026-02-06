import React, { useState } from 'react';
import './Icon3D.css';

const Icon3D = ({ icon: Icon, size = 60, color = '#667eea', label }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!Icon) return null;

  return (
    <div 
      className="icon-3d-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--icon-size': `${size}px`, '--icon-color': color }}
    >
      <div className={`icon-3d-container ${isHovered ? 'hovered' : ''}`}>
        <div className="icon-3d-front">
          <Icon size={size} color={color} />
        </div>
        <div className="icon-3d-back">
          <Icon size={size} color={color} />
        </div>
        <div className="icon-3d-shadow"></div>
      </div>
      {label && <span className="icon-3d-label">{label}</span>}
    </div>
  );
};

export default Icon3D;

