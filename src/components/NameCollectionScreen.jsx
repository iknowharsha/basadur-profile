import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import Button from './common/Button';

const NameCollectionScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const inputRef = useRef(null);

  const [name, setName] = useState(state.userName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-focus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);

      // Save name to global state
      dispatch({
        type: 'SET_USER_NAME',
        payload: name.trim()
      });

      // Simulate brief processing time for better UX
      setTimeout(() => {
        navigate('/report');
      }, 500);
    }
  };

  const isValid = name.trim().length > 0;

  const theme = {
    background: '#FFD7EF', // Bright Pink
    text: '#320707',       // Dark Maroon
  };

  return (
    <div
      className="name-collection-screen"
      style={{
        minHeight: '100vh',
        backgroundColor: theme.background,
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        fontFamily: 'IBM Plex Sans, sans-serif'
      }}
    >

      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>

        {/* Context Heading */}
        <h2 style={{
          fontSize: 'clamp(20px, 4vw, 28px)', // Responsive font size
          fontWeight: 400,
          marginBottom: '24px',
          color: theme.text,
          letterSpacing: '-0.5px'
        }}>
          While we generate your report
        </h2>

        {/* Primary Prompt */}
        <h1 style={{
          fontSize: 'clamp(32px, 7vw, 56px)', // Responsive font size
          fontWeight: 600, // Semibold to match your checkpoint emphasis
          fontStyle: 'italic',
          marginBottom: '40px',
          color: theme.text,
          lineHeight: '1.2',
          letterSpacing: '-0.5px'
        }}>
          Share your full name
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center'
        }}>

          {/* Text Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your full name"
            disabled={isSubmitting}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '16px 20px',
              fontSize: '18px',
              border: 'none',
              borderRadius: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: theme.text,
              textAlign: 'center',
              outline: 'none',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              e.target.style.transform = 'scale(1.02)';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
              e.target.style.transform = 'scale(1)';
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="name-collection"
            theme="implementer"
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </Button>
        </form>

        {/* Optional Helper Text */}
        {!isValid && name.length > 0 && (
          <p style={{
            marginTop: '16px',
            fontSize: '14px',
            color: 'rgba(50, 7, 7, 0.7)'
          }}>
            Enter your full name
          </p>
        )}
      </div>
    </div>
  );
};

export default NameCollectionScreen;
