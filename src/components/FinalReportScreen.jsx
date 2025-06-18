import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { calculateBasadurProfile } from '../utils/calculations';
import { quadrantThemes, quadrantNames } from '../data/wordSets';
import RadarChart from './common/RadarChart';
import Button from './common/Button';

// Download icon component
function MiDocumentDownload(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M4 4a2 2 0 0 1 2-2h8a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm13.586 4L14 4.414V8zM12 4H6v16h12V10h-5a1 1 0 0 1-1-1zm0 7.5a1 1 0 0 1 1 1v2.586l.293-.293a1 1 0 0 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414l.293.293V12.5a1 1 0 0 1 1-1" />
    </svg>
  );
}

// Retake test icon component
function IconamoonPlaylistRepeatListBold(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
        <path strokeLinejoin="round" d="m19 5l2 2m0 0l-2 2m2-2H7M5 19l-2-2m0 0l2-2m-2 2h14" />
        <path d="M3 11a4 4 0 0 1 4-4m14 6a4 4 0 0 1-4 4" />
      </g>
    </svg>
  );
}

const FinalReportScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch, wordSets } = useAppContext();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Calculate results when component mounts
    if (state.userRankings && Object.keys(state.userRankings).length > 0) {
      try {
        const calculatedResults = calculateBasadurProfile(state.userRankings, wordSets);
        setResults(calculatedResults);

        // Save results to global state
        dispatch({
          type: 'SET_CALCULATED_RESULTS',
          payload: calculatedResults
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error calculating profile:', error);
        // Redirect back to start if calculation fails
        navigate('/');
      }
    } else {
      // No rankings found, redirect to start
      navigate('/');
    }
  }, [state.userRankings, wordSets, dispatch, navigate]);

  const handleDownloadReport = async () => {
    if (!results || !state.userName) return;

    try {
      /**
       * Canvas setup – match Figma frame exactly
       * Card size on design ≈ 308w × 540h with 20px border-radius
       * We render @2x for crispness on retina displays then scale back
       */
      const CARD_WIDTH = 340;
      const CARD_HEIGHT = 540;
      const RADIUS = 20;
      const scale = 3; // export at 2×

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = CARD_WIDTH * scale;
      canvas.height = CARD_HEIGHT * scale;
      ctx.scale(scale, scale);

      // Theme + results helpers
      const dominantQuadrant = results.dominantQuadrant;
      const theme = quadrantThemes[dominantQuadrant];
      const dominantResult = results.sortedQuadrants[0];
      const secondaryResults = results.sortedQuadrants.slice(1);

      // --- Background card -------------------------------------------------
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT); // white page bg

      // Card shadow (subtle – matches UI box-shadow)
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = theme.dark;
      ctx.beginPath();
      ctx.roundRect(0, 0, CARD_WIDTH, CARD_HEIGHT, RADIUS);
      ctx.fill();
      ctx.restore();

      // Dark card
      ctx.fillStyle = theme.dark;
      ctx.beginPath();
      ctx.roundRect(0, 0, CARD_WIDTH, CARD_HEIGHT, RADIUS);
      ctx.fill();

      // --- Header / Logo ---------------------------------------------------
      // Load and tint logo SVG
      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const logoSrc = '/assets/Logos/BP - White.svg'; // served from public folder
      const logoImg = await loadImage(logoSrc);

      // Desired dimensions (scale up slightly for new card width)
      const logoTargetWidth = 60;
      const logoTargetHeight = (logoImg.height / logoImg.width) * logoTargetWidth;
      const logoX = (CARD_WIDTH - logoTargetWidth) / 2;
      const logoY = 30;

      // Draw logo to off-screen canvas to apply theme tint
      const off = document.createElement('canvas');
      off.width = logoTargetWidth;
      off.height = logoTargetHeight;
      const offCtx = off.getContext('2d');
      offCtx.drawImage(logoImg, 0, 0, logoTargetWidth, logoTargetHeight);
      offCtx.globalCompositeOperation = 'source-in';
      offCtx.fillStyle = theme.bright;
      offCtx.fillRect(0, 0, logoTargetWidth, logoTargetHeight);

      // Draw tinted logo onto main canvas
      ctx.drawImage(off, logoX, logoY);

      // --- Radar chart -----------------------------------------------------
      const centerX = CARD_WIDTH/2;
      const centerY = 220;
      const maxRadius = 90;

      const vertices = [
        { angle: -Math.PI / 2, label: 'IDEATION', value: results.radarData.ideation },
        { angle: 0, label: 'EXPERIENCING', value: results.radarData.experiencing },
        { angle: Math.PI / 2, label: 'EVALUATION', value: results.radarData.evaluation },
        { angle: Math.PI, label: 'THINKING', value: results.radarData.thinking }
      ];

      // Grid lines – match on-screen radar (theme.bright, thin)
      const gridColor = theme.bright;
      ctx.strokeStyle = gridColor + '40'; // ~25% opacity
      ctx.lineWidth = 1;
      for (let lvl = 1; lvl <= 5; lvl++) {
        const r = (maxRadius * lvl) / 5;
        ctx.beginPath();
        vertices.forEach((v, idx) => {
          const x = centerX + Math.cos(v.angle) * r;
          const y = centerY + Math.sin(v.angle) * r;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
      }

      // Axis lines – subtle bright color
      ctx.strokeStyle = gridColor + '99'; // ~60% opacity
      ctx.lineWidth = 0.6;
      vertices.forEach(v => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(v.angle) * maxRadius, centerY + Math.sin(v.angle) * maxRadius);
        ctx.stroke();
      });

      // Axis labels – IBM Plex Sans, theme.bright
      ctx.fillStyle = theme.bright;
      ctx.font = '8px "IBM Plex Sans", sans-serif';
      const labelOffset = 6;
      vertices.forEach(v => {
        const x = centerX + Math.cos(v.angle) * (maxRadius + labelOffset);
        const y = centerY + Math.sin(v.angle) * (maxRadius + labelOffset);

        // Set alignment based on direction
        if (v.angle === 0) {
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
        } else if (v.angle === Math.PI) {
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
        } else if (v.angle === -Math.PI / 2) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
        } else if (v.angle === Math.PI / 2) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
        }

        ctx.fillText(v.label, x, y);
      });

      // Data polygon
      ctx.fillStyle = theme.bright + '40'; // 25% opacity fill
      ctx.strokeStyle = theme.bright;
      ctx.lineWidth = 3; // match on-screen border width
      ctx.beginPath();
      vertices.forEach((v, idx) => {
        const r = (maxRadius * (v.value / 50)); // scale value to max 50
        const x = centerX + Math.cos(v.angle) * r;
        const y = centerY + Math.sin(v.angle) * r;
        idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // --- Results section --------------------------------------------------
      const resultsY = 400; // per Figma node top-y
      const resultsX = CARD_WIDTH / 2 ;

      // Dominant percentage
      ctx.fillStyle = theme.bright;
      ctx.font = '700 36px "Martian Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${dominantResult.percentage}%`, CARD_WIDTH / 4, resultsY);

      // Dominant label
      ctx.font = '400 14px "Martian Mono", monospace';
      ctx.fillText(quadrantNames[dominantResult.quadrant].toUpperCase(), CARD_WIDTH / 4, resultsY + 26);

      // Secondary results (right list)
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      let rightX = CARD_WIDTH / 2 - 10;
      let rightY = resultsY - 18;
      secondaryResults.forEach(res => {
        const percentText = `${res.percentage.toString().padStart(2, '0')}%`;

        // Draw percentage
        ctx.font = '800 13px "Martian Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(percentText, rightX, rightY);

        // Measure width to dynamically position label with 8px padding
        const pctWidth = ctx.measureText(percentText).width;
        const labelX = rightX + pctWidth + 6; // 8-px gap

        // Draw label
        ctx.font = '400 12px "Martian Mono", monospace';
        ctx.fillText(quadrantNames[res.quadrant].toUpperCase(), labelX, rightY);

        rightY += 22;
      });

      // --- Footer (name + generation date) ----------------------------------
      ctx.textAlign = 'center';

      ctx.fillStyle = theme.bright;
      ctx.font = '500 14px "IBM Plex Sans", sans-serif';

      const nameDisplay = state.userName ? `${state.userName}'s report` : 'Your report';
      ctx.fillText(nameDisplay, CARD_WIDTH / 2, 490);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '300 12px "IBM Plex Sans", sans-serif';
      const genDate = new Date().toLocaleDateString(undefined, {
        day: 'numeric', month: 'short', year: 'numeric'
      });
      ctx.fillText(`generated on ${genDate}`, CARD_WIDTH / 2, 510);

      // --- Export -----------------------------------------------------------
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.userName}_Basadur_Profile.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } catch (err) {
      console.error('Error generating report image:', err);
      // Fallback to text download
      const reportContent = generateReportContent();
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.userName}_Basadur_Profile.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTakeTestAgain = () => {
    // Clear state and return to landing
    dispatch({ type: 'RESET_STATE' });
    navigate('/');
  };

  const generateReportContent = () => {
    const date = new Date().toLocaleDateString();
    const dominant = results.sortedQuadrants[0];

    return `BASADUR PROFILE REPORT
Generated: ${date}
Name: ${state.userName}

RESULTS SUMMARY:
${dominant.percentage}% ${quadrantNames[dominant.quadrant]}

DETAILED BREAKDOWN:
${results.sortedQuadrants.map(q =>
      `${quadrantNames[q.quadrant]}: ${q.percentage}%`
    ).join('\n')}

RADAR CHART DATA:
Ideation: ${results.radarData.ideation}%
Experiencing: ${results.radarData.experiencing}%
Evaluation: ${results.radarData.evaluation}%
Thinking: ${results.radarData.thinking}%

About your dominant profile - ${quadrantNames[dominant.quadrant]}:
${getProfileDescription(dominant.quadrant)}

Generated by Basadur Profile Assessment Tool
Visit: [Your App URL]`;
  };

  const getProfileDescription = (quadrant) => {
    const descriptions = {
      generator: "thrives on fresh questions and endless 'what-ifs.'",
      conceptualizer: "turns big messy thoughts into sharp, shareable ideas.",
      optimizer: "loves stress-testing concepts until the plan feels bulletproof.",
      implementer: "learns through direct involvement and personal experience."
    };
    return descriptions[quadrant] || '';
  };

  if (isLoading || !results) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        color: '#5E5E5E'
      }}>
        Calculating your profile...
      </div>
    );
  }

  const dominantQuadrant = results.dominantQuadrant;
  const theme = quadrantThemes[dominantQuadrant];
  const dominantResult = results.sortedQuadrants[0];
  const secondaryResults = results.sortedQuadrants.slice(1);

  return (
    <div className="final-report-screen" style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'IBM Plex Sans, sans-serif'
    }}>

      {/* Header */}
      <h1 style={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: '20px',
        letterSpacing: '-0.25px',
        fontWeight: '500',
        color: '#212121',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        {state.userName ? `${state.userName}'s Basadur profile` : 'Your Basadur Profile'}
      </h1>

      {/* Main Report Card */}
      <div style={{
        backgroundColor: theme.dark,
        borderRadius: '32px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
      }}>

        {/* Radar Chart */}
        <div style={{ marginBottom: '40px' }}>
          <RadarChart
            data={results.radarData}
            theme={theme}
          />
        </div>

        {/* Results Summary */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>

          {/* Dominant Quadrant */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1',
            minWidth: '100px'
          }}>
            <div style={{
              fontSize: '44px',
              fontWeight: '700',
              color: theme.bright,
              lineHeight: '1',
              marginBottom: '8px',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {dominantResult.percentage}%
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'IBM Plex Sans, sans-serif',
              color: theme.bright,
              letterSpacing: '0.5px',
              textAlign: 'center'
            }}>
              {quadrantNames[dominantResult.quadrant]}
            </div>
          </div>

          {/* Secondary Quadrants */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flex: '1',
            minWidth: '100px'
          }}>
            {secondaryResults.map((result, index) => (
              <div key={result.quadrant} style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '12px',
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span style={{ fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{result.percentage}%</span>
                <span style={{ letterSpacing: '0.4px', fontSize: '14px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: '500' }}>
                  {quadrantNames[result.quadrant]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons – now outside the report card */}
      <div style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '500px'
      }}>

        {/* Take Test Again Button */}
        <Button
          onClick={handleTakeTestAgain}
          variant="unstyled"
          icon={<IconamoonPlaylistRepeatListBold />}
          style={{
            backgroundColor: 'transparent',
            color: theme.dark,
            border: `2px solid ${theme.dark}33`, // 20% opacity border
            fontSize: '16px',
            padding: '16px 20px',
            minWidth: '200px',
            flex: '1 1 auto'
          }}
        >
          Take test again
        </Button>

        {/* Download Report Button */}
        <Button
          onClick={handleDownloadReport}
          variant="report-download"
          icon={<MiDocumentDownload />}
          style={{
            backgroundColor: theme.bright,
            color: theme.dark,
            fontSize: '16px',
            padding: '16px 20px',
            minWidth: '200px',
            flex: '1 1 auto'
          }}
        >
          Download report
        </Button>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#B7B7B7',
        fontSize: '14px',
        width: '90%',
      }}>
        <p style={{ marginBottom: '8px' }}>
          All credit for the Basadur&nbsp;profile framework goes to <a href="https://basadur.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4077C9', textDecoration: 'underline' }}>Basadur.com</a>.
          This site is an independent side-project with zero official ties.
        </p>
        <p style={{ fontSize: '13px' }}>
          Built by <a href="https://www.linkedin.com/in/harshagowda17/" target="_blank" rel="noopener noreferrer" style={{ color: '#4077C9', textDecoration: 'none' }}>THIS HUMAN</a>.
        </p>
      </footer>
    </div>
  );
};

export default FinalReportScreen; 