import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './common/Button';

const LandingScreen = () => {
  const navigate = useNavigate();

  const handleStartRanking = () => {
    navigate('/checkpoint/start');
  };

  const mindsetData = {
    generator: {
      icon: '/assets/SVGS/-a-filled-icon--of-bulb.svg',
      backgroundColor: '#A0E1E1', // Bright Blue
      iconColor: '#21231D', // Dark Charcoal
      title: 'Generator',
      description: 'thrives on fresh questions and endless \'what-ifs.\''
    },
    conceptualizer: {
      icon: '/assets/SVGS/-a-filled-icon--of-brain.svg',
      backgroundColor: '#FFEB69', // Bright Yellow
      iconColor: '#3A341C', // Dark Gold
      title: 'Conceptualizer',
      description: 'turns big messy thoughts into sharp, shareable ideas.'
    },
    optimizer: {
      icon: '/assets/SVGS/-a-filled-icon--of-wrench.svg',
      backgroundColor: '#FFC091', // Bright Orange
      iconColor: '#260A2F', // Dark Purple
      title: 'Optimizer',
      description: 'loves stress-testing concepts until the plan feels bulletproof.'
    },
    implementer: {
      icon: '/assets/SVGS/-a-filled-icon--of-wheelbarrow.svg',
      backgroundColor: '#FFD7EF', // Bright Pink
      iconColor: '#320707', // Dark Maroon
      title: 'Implementer',
      description: 'rolls up sleeves, organizes people, and makes ideas real.'
    }
  };

  return (
    <div className="landing-screen" style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      fontFamily: 'IBM Plex Sans, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: '#ffffff',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        {/* Professional Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img 
            src="/assets/Logos/BP - Black.svg" 
            alt="Basadur Profile" 
            style={{
              height: '60px',
              width: 'auto'
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            maxWidth: '720px',
            marginBottom: '50px',
          }}
        >
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '24px',
            color: '#000000',
            letterSpacing: '-1.5px',
          }}>
            Discover how you think and create in a brainstorm
          </h1>

          <p style={{
            maxWidth: '720px',
            fontSize: '18px',
            color: '#5E5E5E',
            marginBottom: '40px',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            Rank 18 sets of 4 words to reveal your creative strengths and unlock your problem-solving potential.
          </p>

          {/* CTA Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Button 
              onClick={handleStartRanking}
              variant="landing"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 22px)', // Responsive font size
                minWidth: 'clamp(300px, 25vw, 400px)', // Responsive minimum width
                minHeight: 'clamp(60px, 6vw, 80px)' // Responsive height
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 123, 255, 0.4)';
                e.target.style.backgroundColor = '#1a1a1a';
                e.target.style.letterSpacing = '1px';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                e.target.style.backgroundColor = '#000000';
                e.target.style.letterSpacing = '0.5px';
              }}
            >
              Start ranking
            </Button>
            
            <p style={{
              fontSize: '14px',
              color: '#B7B7B7',
              fontWeight: '400'
            }}>
              ⏱️ Takes 5-7 minutes
            </p>
          </div>
        </motion.div>

        {/* Mindset Icons Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            maxWidth: '900px',
            width: '100%'
          }}
        >
          {Object.entries(mindsetData).map(([key, mindset], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.7 + (index * 0.1),
                ease: "easeOut" 
              }}
              style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
            >
              {/* Icon Container */}
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: mindset.backgroundColor,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                padding: '20px'
              }}>
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: mindset.iconColor,
                    mask: `url(${mindset.icon}) no-repeat center`,
                    maskSize: 'contain',
                    WebkitMask: `url(${mindset.icon}) no-repeat center`,
                    WebkitMaskSize: 'contain'
                  }}
                />
              </div>
              
              {/* Content */}
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '8px',
                letterSpacing: '0.2px',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}>
                {mindset.title}
              </h3>
              
              <p style={{
                fontSize: '15px',
                color: '#5E5E5E',
                textAlign: 'center',
                lineHeight: '1.4',
                margin: 0,
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}>
                {mindset.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{
          maxWidth: '1000px',
          width: '100%'
        }}>
          
{/* What is Basadur Profile */}
<div
  style={{
    textAlign: 'center',
    marginBottom: '60px'
  }}
>
  <h2
    style={{
      fontSize: '28px',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '20px',
      letterSpacing: '-0.5px'
    }}
  >
    What is the Basadur Profile?
  </h2>
  <p
         style={{
       fontSize: '18px',
       lineHeight: '1.6',
       color: '#5E5E5E',
       maxWidth: '700px',
       margin: '0 auto'
     }}
  >
    The{' '}
    <a
      href="https://basadur.com/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <span
        style={{
          color: '#4077C9',
          fontWeight: '500',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: '18px',
          letterSpacing: '0.2px'
        }}
      >
        Basadur profile
      </span>
    </a>{' '}
    is a creative problem-solving assessment that identifies your preferred thinking style. It reveals
    whether you naturally lean toward generating ideas, developing concepts, optimizing solutions,
    or implementing plans.
  </p>
</div>


          {/* Why Should You Care */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%,rgb(229, 233, 237) 100%)',
            borderRadius: '24px',
            padding: '50px 40px',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#000000',
              marginBottom: '20px'
            }}>
              Why should you care?
            </h3>
                          <p style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#4B4B4B',
                marginBottom: '16px'
              }}>
              Because group projects get easier when everyone knows their lane.
            </p>
                          <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#5E5E5E',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
              Understanding your thinking style helps you contribute more effectively to team projects, 
              communicate your strengths, and appreciate the diverse perspectives your teammates bring.
            </p>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px'
          }}>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{
        padding: '40px 20px',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
                     <p style={{
             fontSize: '14px',
             fontFamily: 'IBM Plex Sans, sans-serif',
             letterSpacing: '0.5px',
             margin: 0,
             color: '#000000',
             lineHeight: '1.4'
           }}>
             VIBE CODED BY<br />
             <a
               href="https://www.linkedin.com/in/harshagowda17/"
               target="_blank"
               rel="noopener noreferrer"
               style={{
                 color: '#4077C9',
                 textDecoration: 'none',
                 fontWeight: '500'
               }}
             >
               THIS HUMAN
             </a>
           </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen; 