import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './common/Button';

const LandingScreen = () => {
  const navigate = useNavigate();

  const handleStartRanking = () => {
    navigate('/checkpoint/start');
  };

  // Mindset card data (exact copy from Figma desktop)
  const mindsetCards = [
    {
      icon: '/assets/SVGS/-a-filled-icon--of-bulb.svg',
      color: '#75ECEC', // cyan
      title: 'GENERATOR',
      description: 'sparks wild ideas and asks "what if we tried...?"'
    },
    {
      icon: '/assets/SVGS/-a-filled-icon--of-brain.svg',
      color: '#F8964D', // orange
      title: 'CONCEPTUALIZER',
      description: 'turns big messy thoughts into sharp, shareable ideas.'
    },
    {
      icon: '/assets/SVGS/-a-filled-icon--of-wrench.svg',
      color: '#FFE11B', // yellow
      title: 'OPTIMIZER',
      description: 'makes good concepts even better'
    },
    {
      icon: '/assets/SVGS/-a-filled-icon--of-wheelbarrow.svg',
      color: '#FE96D4', // pink'
      title: 'IMPLEMENTER',
      description: 'organizes teams and gets things done'
    }
  ];

  // Ref for highlight sentence
  const highlightRef = useRef(null);

  // Reveal highlight on scroll
  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('highlight-reveal');
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: 'IBM Plex Sans, sans-serif',
      color: '#000000',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Highlight animation CSS */}
      <style>{`
        .highlight {
          position: relative;
          display: inline-block;
          z-index: 1;
        }
        .highlight::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0.05em;
          height: 1.4em;
          width: 100%;
          background:rgb(254, 246, 194);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 1s ease-out;
          z-index: -1;
        }
        .highlight-reveal::before {
          transform: scaleX(1);
        }

        /* NEW: disable on small screens */
        @media(max-width:600px){
          .highlight::before{ display:none; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{
        padding: '100px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* SVG Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginBottom: '64px', display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/assets/Logos/BP - Black.svg"
            alt="Basadur Profile Logo"
            style={{ width: '80px', height: 'auto' }}
          />
        </motion.div>

        {/* Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '14px'
          }}
        >
          {mindsetCards.map(c => (
            <div
              key={c.title}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: c.color,
                mask: `url(${c.icon}) center / contain no-repeat`,
                WebkitMask: `url(${c.icon}) center / contain no-repeat`
              }}
            />
          ))}
        </motion.div>

        {/* Main Heading + Sub copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{ maxWidth: '900px' }}
        >
          <h1 style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(40px, 5.5vw, 64px)',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: '20px'
          }}>
            Identify your creative role to ace in group projects
          </h1>

          <p style={{
            fontSize: 'clamp(17px, 2vw, 24px)',
            color: '#777777',
            letterSpacing: '-0.28px',
            lineHeight: 1.3,
            marginBottom: '60px'
          }}>
            Drag and rank 18 word sets to uncover your unique role in any project.
          </p>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
        >
          <Button
            onClick={handleStartRanking}
            variant="landing"
            style={{
              width: 'clamp(240px, 60vw, 400px)',
              minHeight: '64px',
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontFamily: `ibm plex sans, sans-serif`,
              fontWeight: 400
            }}
          >
            Start ranking
          </Button>
          <p style={{ fontSize: '14px', color: '#777777' }}>⏱️ Takes ~5-7 minutes</p>
        </motion.div>
      </section>

      {/* ABOUT SECTION (Figma ref 234-96) */}
      <section style={{ padding: '0 20px 120px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '632px', width: '100%' }}>
          {/* What is header */}
          <h2 style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>WHAT IS BASADUR PROFILE?</h2>

          <p style={{
            fontSize: '16px',
            color: '#777777',
            lineHeight: '24px',
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            The Basadur Profile shows how your brain actually tackles problems and generates ideas. Created by creativity researcher Dr. Min Basadur, it maps you to one of four thinking styles that show up in every brainstorm and group project.
          </p>

          {/* Mindset row (wrap) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '47px',
            justifyContent: 'center',
            marginBottom: '80px'
          }}>
            {mindsetCards.map(card => (
              <div key={card.title} style={{ width: '264px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: card.color,
                  mask: `url(${card.icon}) center / contain no-repeat`,
                  WebkitMask: `url(${card.icon}) center / contain no-repeat`
                }} />
                <h3 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '16px', fontWeight: 600, margin: 0 }}>{card.title}</h3>
                <p style={{ fontSize: '16px', color: '#777777', lineHeight: '24px', textAlign: 'center', margin: 0 }}>{card.description}</p>
              </div>
            ))}
          </div>

          {/* Why care */}
          <h3 style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '-0.96px',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>Why should you care?</h3>

          <p style={{ fontSize: '16px', color: '#777777', lineHeight: '24px', textAlign: 'center', marginBottom: '28px' }}>
            <span ref={highlightRef} className="highlight">Because group projects flow when everyone knows their natural role.</span> Instead of stepping on each other's toes or leaving gaps unfilled, your team can divide and conquer from day one. Generators spark the ideas, Conceptualizers shape the strategy, Optimizers refine the plan, and Implementers build the final product.
          </p>
          <p style={{ fontSize: '16px', color: '#777777', lineHeight: '24px', textAlign: 'center' }}>
            Drag and rank word sets for 5-7 minutes. We'll crunch the numbers and show you a radar chart that reveals your creative sweet spot—and how to use it to crush your next group assignment.
          </p>
        </div>
      </section>

      {/* FOOTER – replicated from FinalReportScreen */}
      <footer style={{
        marginTop: '20px',
        padding: '0 20px 60px',
        textAlign: 'center',
        color: '#777777',
        fontSize: '15px',
        width: '100%'
      }}>
        <p style={{ marginBottom: '8px' }}>
          All credit for the Basadur&nbsp;profile framework goes to&nbsp;
          <a href="https://basadur.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4077C9', textDecoration: 'none' }}>Basadur.com</a>.
          This site is an independent side-project with zero official ties.
        </p>
        <p style={{ fontSize: '13px' }}>
          Built by&nbsp;
          <a href="https://iknowharsha.framer.website/about" target="_blank" rel="noopener noreferrer" style={{ color: '#4077C9', textDecoration: 'none' }}>THIS HUMAN</a>.
        </p>
      </footer>
    </div>
  );
};

export default LandingScreen; 