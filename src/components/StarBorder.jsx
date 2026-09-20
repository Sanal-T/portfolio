import React from 'react';
import './StarBorder.css';

export default function StarBorder({
  as: Component = 'div',
  className = '',
  color = '#7df9ff',
  speed = '6s',
  thickness = 1.5,
  borderRadius = 24,
  style = {},
  children,
  ...rest
}) {
  const roundedValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius: roundedValue,
        ...style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content" style={{ borderRadius: roundedValue }}>
        {children}
      </div>
    </Component>
  );
}
