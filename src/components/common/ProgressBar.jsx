import React from 'react';

const ProgressBar = ({ current, total, theme = null, showText = true }) => {
  const percentage = Math.round((current / total) * 100);
  
  // Default theme for regular progress bars
  const defaultTheme = {
    background: 'rgba(0, 0, 0, 0.15)', // 8% opacity black
    fill: '#000000',
    text: '#000000'
  };

  const currentTheme = theme || defaultTheme;

  return (
    <div className="progress-bar-container" style={{ 
      padding: '20px',
      fontFamily: 'Martian Mono, JetBrains Mono, monospace'
    }}>
      {showText && (
        <div 
          className="progress-labels"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: '500',
            color: currentTheme.text,
            fontFamily: 'Martian Mono, JetBrains Mono, monospace',
            letterSpacing: '0.5px'
          }}
        >
          <span style={{ 
            textTransform: 'uppercase',
            fontSize: 'clamp(14px, 1.8vw, 14px)',
            fontWeight: '800'
          }}>
            SET {current} OF {total}
          </span>
          <span style={{ 
            fontSize: 'clamp(14px, 1.8vw, 14px)',
            fontWeight: '800'
          }}>
            {percentage}%
          </span>
        </div>
      )}
      
      <div 
        className="progress-track"
        style={{
          width: '100%',
          height: '18px',
          backgroundColor: currentTheme.background || 'rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div 
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: currentTheme.fill,
            borderRadius: '4px',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 