import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const FinalReportScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch, wordSets } = useAppContext();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Add ref for the report card
  const reportCardRef = useRef(null);

  // ... existing useEffect and other functions ...

  const handleDownloadReport = async () => {
    if (!results || !state.userName || !reportCardRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Create a temporary container for the downloadable version
      const downloadContainer = document.createElement('div');
      downloadContainer.style.position = 'absolute';
      downloadContainer.style.left = '-9999px';
      downloadContainer.style.top = '0';
      downloadContainer.style.width = '800px';
      downloadContainer.style.height = 'auto';
      downloadContainer.style.backgroundColor = '#FFFFFF';
      downloadContainer.style.fontFamily = 'IBM Plex Sans, sans-serif';
      
      // Create the download card content
      downloadContainer.innerHTML = await createDownloadCardHTML();
      
      document.body.appendChild(downloadContainer);
      
      // Wait a bit for fonts and content to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Capture the image
      const canvas = await html2canvas(downloadContainer, {
        backgroundColor: '#FFFFFF',
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 800,
        height: 1000
      });
      
      // Download the image
      const link = document.createElement('a');
      link.download = `${state.userName}_Basadur_Profile.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // Clean up
      document.body.removeChild(downloadContainer);
      
    } catch (error) {
      console.error('Error generating report image:', error);
      alert('Sorry, there was an error generating your report image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const createDownloadCardHTML = async () => {
    const dominantResult = results.sortedQuadrants[0];
    const secondaryResults = results.sortedQuadrants.slice(1);
    const theme = quadrantThemes[results.dominantQuadrant];
    
    // Load and encode the logo
    const logoDataUrl = await loadLogoAsDataUrl();
    
    return `
      <div style="
        background: linear-gradient(135deg, ${theme.dark} 0%, ${theme.bright}20 100%);
        border-radius: 24px;
        padding: 40px;
        width: 720px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        position: relative;
        box-sizing: border-box;
      ">
        <!-- Header with Logo -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          gap: 16px;
        ">
          ${logoDataUrl ? `<img src="${logoDataUrl}" alt="Basadur Profile" style="width: 60px; height: 60px;" />` : ''}
          <h1 style="
            font-size: 28px;
            font-weight: 300;
            color: ${theme.bright};
            margin: 0;
            text-align: center;
          ">
            ${state.userName}'s Basadur Profile
          </h1>
        </div>

        <!-- Chart Placeholder -->
        <div style="
          width: 300px;
          height: 300px;
          margin: 0 auto 40px auto;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid ${theme.bright};
          position: relative;
        ">
          <div style="
            text-align: center;
            color: ${theme.bright};
          ">
            <div style="font-size: 48px; font-weight: bold; margin-bottom: 8px;">
              ${dominantResult.percentage}%
            </div>
            <div style="font-size: 18px; font-weight: bold;">
              ${quadrantNames[dominantResult.quadrant].toUpperCase()}
            </div>
          </div>
          
          <!-- Radar Chart Labels -->
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: ${theme.bright}; font-size: 12px; font-weight: bold;">IDEATION</div>
          <div style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); color: ${theme.bright}; font-size: 12px; font-weight: bold;">EXPERIENCING</div>
          <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); color: ${theme.bright}; font-size: 12px; font-weight: bold;">EVALUATION</div>
          <div style="position: absolute; left: -20px; top: 50%; transform: translateY(-50%); color: ${theme.bright}; font-size: 12px; font-weight: bold;">THINKING</div>
        </div>

        <!-- Results Summary -->
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 40px;
        ">
          <!-- Dominant Quadrant -->
          <div style="
            text-align: center;
            flex: 1;
          ">
            <div style="
              font-size: 64px;
              font-weight: bold;
              color: ${theme.bright};
              line-height: 1;
              margin-bottom: 8px;
              font-family: 'JetBrains Mono', monospace;
            ">
              ${dominantResult.percentage}%
            </div>
            <div style="
              font-size: 24px;
              font-weight: bold;
              color: ${theme.bright};
              letter-spacing: 1px;
            ">
              ${quadrantNames[dominantResult.quadrant].toUpperCase()}
            </div>
          </div>

          <!-- Secondary Quadrants -->
          <div style="
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex: 1;
          ">
            ${secondaryResults.map(result => `
              <div style="
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 18px;
                color: rgba(255, 255, 255, 0.9);
              ">
                <span style="
                  font-weight: 800;
                  font-family: 'JetBrains Mono', monospace;
                  min-width: 60px;
                ">
                  ${result.percentage}%
                </span>
                <span style="letter-spacing: 0.5px;">
                  ${quadrantNames[result.quadrant]}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer -->
        <div style="
          text-align: center;
          color: ${theme.bright};
          font-size: 14px;
          opacity: 0.8;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 20px;
          margin-top: 20px;
        ">
          <p style="margin: 0;">Generated by Basadur Profile Assessment</p>
          <p style="margin: 8px 0 0 0;">Understanding your thinking style improves team collaboration</p>
        </div>
      </div>
    `;
  };

  const loadLogoAsDataUrl = async () => {
    try {
      const response = await fetch('/assets/Logos/BP - White.svg');
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error loading logo:', error);
      return null;
    }
  };

  // ... existing code ...

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

      {/* ... existing header ... */}

      {/* Main Report Card */}
      <div 
        ref={reportCardRef}
        style={{
          backgroundColor: theme.dark,
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
        }}
      >
        {/* ... existing content ... */}

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
            icon="🔄"
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
            icon={isDownloading ? "⏳" : "📄"}
            disabled={isDownloading}
            style={{
              backgroundColor: theme.bright,
              color: theme.dark,
              fontSize: '16px',
              padding: '16px 32px',
              minWidth: '200px',
              flex: '1 1 auto',
              opacity: isDownloading ? 0.7 : 1,
              cursor: isDownloading ? 'not-allowed' : 'pointer'
            }}
          >
            {isDownloading ? 'Generating...' : 'Download report'}
          </Button>
        </div>
      </div>

      {/* ... existing footer ... */}
    </div>
  );
};

export default FinalReportScreen; 