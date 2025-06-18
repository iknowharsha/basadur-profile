import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAppContext } from '../App';
import ProgressBar from './common/ProgressBar';
import Button from './common/Button';

const CheckpointScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  // const { state } = useAppContext();

  // Checkpoint configurations
  const checkpoints = {
    start: {
      progress: { current: 0, total: 18 },
      theme: {
        background: '#A0E1E1', // Bright Blue
        text: '#21231D',       // Dark Charcoal
        progressFill: '#21231D'
      },
      buttonTheme: 'generator', // Maps to generator colors
      heading: 'Ready to discover\n*how you think?*',
      ctaText: "Let's begin",
      nextRoute: '/question/1'
    },
    midpoint: {
      progress: { current: 6, total: 18 },
      theme: {
        background: '#FFEB69', // Bright Yellow
        text: '#3A341C',       // Dark Gold
        progressFill: '#3A341C'
      },
      buttonTheme: 'conceptualizer', // Maps to conceptualizer colors
      heading: 'Nice pace!\n*You\'re cruising through this.*',
      ctaText: 'Keep it moving',
      nextRoute: '/question/7'
    },
    final: {
      progress: { current: 12, total: 18 },
      theme: {
        background: '#FFC091', // Bright Orange
        text: '#260A2F',       // Dark Purple
        progressFill: '#260A2F'
      },
      buttonTheme: 'optimizer', // Maps to optimizer colors
      heading: 'Final lap,\n*just a few rankings left.*',
      ctaText: 'Finish strong',
      nextRoute: '/question/13'
    }
  };

  const config = checkpoints[type] || checkpoints.start;

  const handleContinue = () => {
    navigate(config.nextRoute);
  };

  // Navigate back depending on checkpoint type
  const handleBack = () => {
    if (type === 'start') {
      navigate('/');
    } else if (type === 'midpoint') {
      navigate('/question/6');
    } else if (type === 'final') {
      navigate('/question/12');
    } else {
      navigate(-1);
    }
  };

  // Process heading text to handle italic formatting and line breaks
  const processHeading = (text) => {
    const parts = text.split('*');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is an italic part
        return (
          <span 
            key={index} 
            style={{ 
              fontStyle: 'italic', 
              fontWeight: '600' // semibold
            }}
          >
            {part.split('\n').map((line, lineIndex) => (
              <span key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </span>
            ))}
          </span>
        );
      } else {
        // This is regular text, handle line breaks
        return part.split('\n').map((line, lineIndex) => (
          <span key={`${index}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            {line}
          </span>
        ));
      }
    });
  };

  return (
    <div 
      className="checkpoint-screen"
      style={{
        minHeight: '100vh',
        backgroundColor: config.theme.background,
        color: config.theme.text,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'IBM Plex Sans, sans-serif'
      }}
    >
      {/* Progress Bar – aligned & sized like RankingScreen */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '16px',
          transform: 'translateX(-50%)',
          width: '520px',
          maxWidth: '90vw'
        }}
      >
        <ProgressBar
          current={config.progress.current}
          total={config.progress.total}
          theme={{
            background: 'rgba(0, 0, 0, 0.08)',
            fill: config.theme.progressFill,
            text: config.theme.text
          }}
          showText={true}
        />
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(20px, 5vw, 60px) clamp(20px, 5vw, 40px)',
        textAlign: 'center',
        minHeight: '70vh'
      }}>
        
        {/* Motivational Heading with subtle animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: 0.1
          }}
          style={{
            fontSize: 'clamp(32px, 7vw, 56px)',
            fontWeight: '400', // regular weight for base text
            fontFamily: 'IBM Plex Sans, sans-serif',
            lineHeight: '1.3',
            marginBottom: 'clamp(40px, 8vw, 80px)',
            maxWidth: '700px',
            color: config.theme.text,
            letterSpacing: '-0.5px'
          }}
        >
          {processHeading(config.heading)}
        </motion.h1>

        {/* Navigation Buttons – aligned like RankingScreen */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '40px',
            transform: 'translateX(-50%)',
            width: '520px',
            maxWidth: '90vw'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button
              onClick={handleBack}
              variant="checkpoint-back"
              style={{
                width: '120px',
                height: '60px',
                borderRadius: '28px',
                fontFamily: 'Martian Mono, JetBrains Mono, monospace',
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '0.28px',
                padding: '16px',
                minWidth: 'unset',
                minHeight: 'unset'
              }}
            >
              ← Back
            </Button>

            <Button
              onClick={handleContinue}
              variant="checkpoint"
              theme={config.buttonTheme}
              style={{
                width: '224px',
                height: '60px',
                borderRadius: '28px',
                fontFamily: 'Martian Mono, JetBrains Mono, monospace',
                fontSize: '14px',
                fontWeight: '500',
                padding: '16px',
                minWidth: 'unset',
                minHeight: 'unset'
              }}
            >
              {config.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckpointScreen; 