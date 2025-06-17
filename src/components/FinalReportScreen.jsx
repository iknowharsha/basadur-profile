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
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (matching Figma design exactly)
      const scale = 2;
      canvas.width = 308 * scale;
      canvas.height = 500 * scale;
      ctx.scale(scale, scale);
      
      // Get theme colors
      const dominantQuadrant = results.dominantQuadrant;
      const theme = quadrantThemes[dominantQuadrant];
      const dominantResult = results.sortedQuadrants[0];
      const secondaryResults = results.sortedQuadrants.slice(1);
      
      // Draw dark background with rounded corners (#21231d from Figma)
      ctx.fillStyle = '#21231d';
      ctx.beginPath();
      ctx.roundRect(0, 0, 308, 500, 20);
      ctx.fill();
      
      // Load and draw logo (we'll create a simple text version since canvas can't load SVG directly)
      ctx.fillStyle = theme.bright;
      ctx.font = '16px "Martian Mono", monospace';
      ctx.textAlign = 'center';
      
      // Draw "your" in script font style
      ctx.font = '15.5px "Grape Nuts", cursive';
      ctx.fillText('your', 154, 35);
      
      // Draw "BASADUR PROFILE" 
      ctx.font = 'bold 13px "Martian Mono", monospace';
      ctx.fillText('BASADUR', 154, 52);
      ctx.fillText('PROFILE', 154, 67);
      
      // Draw diamond-shaped radar chart (centered)
      const centerX = 154;
      const centerY = 200;
      const maxRadius = 80;
      
      // Diamond vertices positioned exactly like Figma
      const vertices = [
        { angle: -Math.PI/2, label: 'IDEATION', value: results.radarData.ideation },
        { angle: 0, label: 'EXPERIENCING', value: results.radarData.experiencing },
        { angle: Math.PI/2, label: 'EVALUATION', value: results.radarData.evaluation },
        { angle: Math.PI, label: 'THINKING', value: results.radarData.thinking }
      ];
      
      // Draw grid lines (5 levels as in Figma)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      
      for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius * level) / 5;
        ctx.beginPath();
        vertices.forEach((vertex, index) => {
          const x = centerX + Math.cos(vertex.angle) * radius;
          const y = centerY + Math.sin(vertex.angle) * radius;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.stroke();
      }
      
      // Draw axis lines
      vertices.forEach(vertex => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const endX = centerX + Math.cos(vertex.angle) * maxRadius;
        const endY = centerY + Math.sin(vertex.angle) * maxRadius;
        ctx.lineTo(endX, endY);
        ctx.stroke();
      });
      
      // Draw axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px "Martian Mono", monospace';
      ctx.textAlign = 'center';
      
      vertices.forEach(vertex => {
        const labelDistance = maxRadius + 20;
        const labelX = centerX + Math.cos(vertex.angle) * labelDistance;
        const labelY = centerY + Math.sin(vertex.angle) * labelDistance + 3;
        ctx.fillText(vertex.label, labelX, labelY);
      });
      
      // Draw data polygon
      ctx.fillStyle = theme.bright + '40'; // 40% opacity
      ctx.strokeStyle = theme.bright;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      vertices.forEach((vertex, index) => {
        const value = vertex.value / 100;
        const radius = maxRadius * value;
        const x = centerX + Math.cos(vertex.angle) * radius;
        const y = centerY + Math.sin(vertex.angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw results section (positioned like Figma layout)
      const resultsY = 340;
      
      // Left side - dominant result
      ctx.fillStyle = theme.bright;
      ctx.font = 'bold 32px "Martian Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${dominantResult.percentage}%`, 77, resultsY);
      
      ctx.font = '13px "Martian Mono", monospace';
      ctx.fillText(quadrantNames[dominantResult.quadrant].toUpperCase(), 77, resultsY + 24);
      
      // Right side - secondary results
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = 'bold 14px "Martian Mono", monospace';
      ctx.textAlign = 'left';
      
      let rightX = 145;
      let rightY = resultsY - 15;
      
      secondaryResults.forEach(result => {
        // Draw percentage
        ctx.fillText(`${result.percentage.toString().padStart(2, '0')}%`, rightX, rightY);
        
        // Draw name
        ctx.font = '13px "Martian Mono", monospace';
        ctx.fillText(quadrantNames[result.quadrant].toUpperCase(), rightX + 35, rightY);
        ctx.font = 'bold 14px "Martian Mono", monospace';
        
        rightY += 20;
      });
      
      // Draw user name at bottom
      ctx.fillStyle = theme.bright;
      ctx.font = '12px "Martian Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(state.userName?.toUpperCase() || '', 154, 470);
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.userName}_Basadur_Profile.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Error generating report image:', error);
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
        fontSize: '24px',
        fontWeight: '300',
        color: '#5E5E5E',
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        {state.userName ? `${state.userName}'s Basadur Profile` : 'Your Basadur Profile'}
      </h1>

      {/* Main Report Card */}
      <div style={{
        backgroundColor: theme.dark,
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '600px',
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
          gap: '40px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>

          {/* Dominant Quadrant */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1',
            minWidth: '200px'
          }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: theme.bright,
              lineHeight: '1',
              marginBottom: '8px',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {dominantResult.percentage}%
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: theme.bright,
              letterSpacing: '1px',
              textAlign: 'center'
            }}>
              {quadrantNames[dominantResult.quadrant]}
            </div>
          </div>

          {/* Secondary Quadrants */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: '1',
            minWidth: '200px'
          }}>
            {secondaryResults.map((result, index) => (
              <div key={result.quadrant} style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span style={{ fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>{result.percentage}%</span>
                <span style={{ letterSpacing: '0.5px' }}>
                  {quadrantNames[result.quadrant]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>



          {/* Take Test Again Button */}
          <Button
            onClick={handleTakeTestAgain}
            variant="themed"
            icon={<IconamoonPlaylistRepeatListBold />}
            style={{
              backgroundColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.8)',
              border: `2px solid rgba(255, 255, 255, 0.3)`,
              fontSize: '16px',
              padding: '16px 32px',
              minWidth: '200px',
              flex: '1 1 auto'
            }}
          >
            Take test again
          </Button>

          {/* Download Report Button */}
          <Button
            onClick={handleDownloadReport}
            variant="themed"
            icon={<MiDocumentDownload />}
            style={{
              backgroundColor: theme.bright,
              color: theme.dark,
              fontSize: '16px',
              padding: '16px 32px',
              minWidth: '200px',
              flex: '1 1 auto'
            }}
          >
            Download report
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#B7B7B7',
        fontSize: '14px'
      }}>
        <p>Generated by Basadur Profile Assessment</p>
        <p style={{ marginTop: '8px' }}>
          Understanding your thinking style helps improve team collaboration
        </p>
      </footer>
    </div>
  );
};

export default FinalReportScreen; 