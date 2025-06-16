// Basadur Profile calculation utilities
import { excludedRows, columnToQuadrant } from '../data/wordSets';

// Convert user rank (1-4 where 1 is "most like me") to Basadur score (1-4 where 4 is "most characteristic")
export const convertRankToBasadurScore = (userRank) => {
  return 5 - userRank;
};

// Validate that rankings are valid
export const validateRankings = (rankings) => {
  if (!rankings) return false;
  
  // Check if we have exactly 4 rankings
  const values = Object.values(rankings);
  if (values.length !== 4) return false;
  
  // Check if rankings are 1-4
  const validRanks = values.every(rank => rank >= 1 && rank <= 4);
  if (!validRanks) return false;
  
  // Check if each rank appears exactly once
  const counts = values.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});
  
  return Object.values(counts).every(count => count === 1);
};

// Calculate column totals from user rankings
export const calculateColumnTotals = (userRankings, wordSets) => {
  const columnTotals = { 1: 0, 2: 0, 3: 0, 4: 0 };
  let processedRows = 0;
  
  console.log('Starting column totals calculation with rankings:', userRankings);
  
  // Only process included rows (exclude rows 1, 2, 5, 10, 14, 17)
  wordSets.forEach(set => {
    if (!excludedRows.includes(set.row)) {
      const rankings = userRankings[set.row];
      console.log(`Processing row ${set.row}:`, {
        rankings,
        words: set.words.map(w => `${w.letter}(${w.column})`)
      });
      
      if (rankings) {
        // Validate rankings before processing
        if (!validateRankings(rankings)) {
          console.warn(`Invalid rankings for row ${set.row}:`, rankings);
          return;
        }
        
        processedRows++;
        set.words.forEach(word => {
          const userRank = rankings[word.letter];
          if (userRank) {
            const basadurScore = convertRankToBasadurScore(userRank);
            columnTotals[word.column] += basadurScore;
            console.log(`Row ${set.row}, Word ${word.letter}: Column ${word.column}, Rank ${userRank} → Score ${basadurScore}`);
          }
        });
      }
    }
  });
  
  // Validate that we processed all required rows
  if (processedRows !== 12) {
    console.warn(`Warning: Processed ${processedRows} rows instead of expected 12 rows`);
  }
  
  console.log('Final column totals:', columnTotals);
  return columnTotals;
};

// Calculate final quadrant percentages
export const calculateQuadrantPercentages = (columnTotals) => {
  // Calculate the total score across all columns
  const totalScore = Object.values(columnTotals).reduce((sum, val) => sum + val, 0);
  
  console.log('Calculating percentages with total score:', totalScore);
  
  // Calculate percentages relative to total score
  const percentages = {};
  Object.keys(columnTotals).forEach(column => {
    const quadrant = columnToQuadrant[parseInt(column)];
    // Normalize to percentage of total
    percentages[quadrant] = Math.round((columnTotals[column] / totalScore) * 100);
    console.log(`Column ${column} (${quadrant}): ${columnTotals[column]} / ${totalScore} = ${percentages[quadrant]}%`);
  });
  
  return percentages;
};

// Find the dominant quadrant (highest percentage)
export const getDominantQuadrant = (percentages) => {
  return Object.keys(percentages).reduce((a, b) => 
    percentages[a] > percentages[b] ? a : b
  );
};

// Get quadrants sorted by percentage (descending)
export const getSortedQuadrants = (percentages) => {
  return Object.entries(percentages)
    .sort(([,a], [,b]) => b - a)
    .map(([quadrant, percentage]) => ({ quadrant, percentage }));
};

// Main calculation function - processes all user rankings and returns final results
export const calculateBasadurProfile = (userRankings, wordSets) => {
  // Step 1: Calculate column totals
  const columnTotals = calculateColumnTotals(userRankings, wordSets);
  console.log('Column Totals:', columnTotals);
  
  // Step 2: Convert to percentages
  const percentages = calculateQuadrantPercentages(columnTotals);
  console.log('Quadrant Percentages:', percentages);
  
  // Step 3: Find dominant quadrant
  const dominantQuadrant = getDominantQuadrant(percentages);
  console.log('Dominant Quadrant:', dominantQuadrant);
  
  // Step 4: Sort all quadrants by percentage
  const sortedQuadrants = getSortedQuadrants(percentages);
  
  return {
    columnTotals,
    percentages,
    dominantQuadrant,
    sortedQuadrants,
    radarData: {
      ideation: percentages.generator,
      experiencing: percentages.implementer,
      evaluation: percentages.optimizer,
      thinking: percentages.conceptualizer
    }
  };
};

// Check if all questions have been answered
export const isProfileComplete = (userRankings, totalQuestions = 18) => {
  const answeredQuestions = Object.keys(userRankings).length;
  return answeredQuestions === totalQuestions;
};

// Validate that a question set has been completely ranked
export const isQuestionComplete = (rankings) => {
  return validateRankings(rankings);
};

// Get completion percentage for progress display
export const getCompletionPercentage = (userRankings, totalQuestions = 18) => {
  const completedQuestions = Object.keys(userRankings).filter(questionNum => 
    isQuestionComplete(userRankings[questionNum])
  ).length;
  
  return Math.round((completedQuestions / totalQuestions) * 100);
}; 