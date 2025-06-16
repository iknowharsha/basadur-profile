import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  theme = 'generator',
  questionRange = '1-6',
  disabled = false, 
  className = '',
  style = {},
  icon = null
}) => {
  
  // Color palette mapping
  const colorPalette = {
    generator: {
      bright: '#A0E1E1', // Bright Blue
      dark: '#21231D'    // Dark Charcoal
    },
    conceptualizer: {
      bright: '#FFEB69', // Bright Yellow
      dark: '#3A341C'    // Dark Gold
    },
    optimizer: {
      bright: '#FFC091', // Bright Orange
      dark: '#260A2F'    // Dark Purple
    },
    implementer: {
      bright: '#FFD7EF', // Bright Pink
      dark: '#320707'    // Dark Maroon
    }
  };

  // Question range color mapping for ranking screens
  const getQuestionRangeColors = (range) => {
    const rangeMap = {
      '1-6': colorPalette.generator,
      '7-12': colorPalette.conceptualizer,
      '13-18': colorPalette.optimizer
    };
    return rangeMap[range] || rangeMap['1-6'];
  };

  // Base styles for all buttons
  const baseStyles = {
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: '450',
    fontSize: 'clamp(18px, 5vw, 14px)',
    padding: 'clamp(28px 48px, 6vw, 36px 64px)',
    minWidth: 'clamp(200px, 45vw, 280px)',
    minHeight: 'clamp(60px, 6vw, 60px)',
    borderRadius: '50px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    outline: 'none',
    textDecoration: 'none',
    letterSpacing: '0px',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    const colors = colorPalette[theme];
    const questionColors = getQuestionRangeColors(questionRange);

    switch (variant) {
      case 'checkpoint':
      case 'name-collection':
        // Dark background, light text
        return {
          backgroundColor: colors.dark,
          color: colors.bright
        };
      
      case 'ranking-next':
        // Light background, dark text based on question range
        return {
          backgroundColor: questionColors.bright,
          color: questionColors.dark
        };
      
      case 'ranking-back':
        // Secondary styling for back button
        return {
          backgroundColor: '#F3F3F3',
          color: '#4B4B4B'
        };
      
      case 'landing':
        // Landing page specific styling
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF'
        };
      
      case 'primary':
      default:
        // Default primary styling
        return {
          backgroundColor: '#000000',
          color: '#FFFFFF'
        };
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...getVariantStyles()
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      className={`button button-${variant} ${className}`}
      style={combinedStyles}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </button>
  );
};

export default Button; 