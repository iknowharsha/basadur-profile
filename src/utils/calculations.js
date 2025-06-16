// Basadur Profile calculation utilities
import { excludedRows, columnToQuadrant } from '../data/wordSets';

// Convert user rank (1-4 where 1 is "most like me") to Basadur score (1-4 where 4 is "most characteristic")
export const convertRankToBasadurScore = (userRank) => {
  return 5 - userRank;
};

// Calculate column totals from user rankings
export const calculateColumnTotals = (userRankings, wordSets) => {
  const columnTotals = { 1: 0, 2: 0, 3: 0, 4: 0 };
  
  // Only process included rows (exclude rows 1, 2, 5, 10, 14, 17)
  wordSets.forEach(set => {
    if (!excludedRows.includes(set.row)) {
      const rankings = userRankings[set.row];
      if (rankings) {
        set.words.forEach(word => {
          const userRank = rankings[word.letter];
          if (userRank) {
            const basadurScore = convertRankToBasadurScore(userRank);
            columnTotals[word.column] += basadurScore;
          }
        });
      }
    }
  });
  
  return columnTotals;
};

// Calculate final quadrant percentages
export const calculateQuadrantPercentages = (columnTotals) => {
  // Maximum possible score: 12 included rows × 4 max score = 48
  const maxScore = 48;
  
  const percentages = {};
  Object.keys(columnTotals).forEach(column => {
    const quadrant = columnToQuadrant[parseInt(column)];
    percentages[quadrant] = Math.round((columnTotals[column] / maxScore) * 100);
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
  
  // Step 2: Convert to percentages
  const percentages = calculateQuadrantPercentages(columnTotals);
  
  // Step 3: Find dominant quadrant
  const dominantQuadrant = getDominantQuadrant(percentages);
  
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
  if (!rankings) return false;
  
  const ranks = Object.values(rankings);
  if (ranks.length !== 4) return false;
  
  // Check that all ranks 1-4 are present exactly once
  const sortedRanks = ranks.sort();
  return JSON.stringify(sortedRanks) === JSON.stringify([1, 2, 3, 4]);
};

// Get completion percentage for progress display
export const getCompletionPercentage = (userRankings, totalQuestions = 18) => {
  const completedQuestions = Object.keys(userRankings).filter(questionNum => 
    isQuestionComplete(userRankings[questionNum])
  ).length;
  
  return Math.round((completedQuestions / totalQuestions) * 100);
}; 