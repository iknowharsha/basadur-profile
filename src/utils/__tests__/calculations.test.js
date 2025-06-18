import { convertRankToBasadurScore, validateRankings, calculateColumnTotals, calculateQuadrantPercentages, getDominantQuadrant, getSortedQuadrants } from '../calculations';
import { wordSets, excludedRows, columnToQuadrant } from '../../data/wordSets';

// Helper to build a complete set of user rankings for testing
const buildUserRankings = (rankMap) => {
  const rankings = {};
  wordSets.forEach(({ row, words }) => {
    rankings[row] = {};
    words.forEach(({ letter }) => {
      rankings[row][letter] = rankMap[letter];
    });
  });
  return rankings;
};

describe('Basadur calculations utilities', () => {
  describe('convertRankToBasadurScore', () => {
    it('should correctly convert ranks 1-4 to scores 4-1', () => {
      expect(convertRankToBasadurScore(1)).toBe(4);
      expect(convertRankToBasadurScore(2)).toBe(3);
      expect(convertRankToBasadurScore(3)).toBe(2);
      expect(convertRankToBasadurScore(4)).toBe(1);
    });
  });

  describe('validateRankings', () => {
    it('returns true for a valid ranking set', () => {
      const valid = { a: 1, b: 2, c: 3, d: 4 };
      expect(validateRankings(valid)).toBe(true);
    });

    it('returns false when ranks are missing', () => {
      const invalid = { a: 1, b: 2, c: 3 }; // missing d
      expect(validateRankings(invalid)).toBe(false);
    });

    it('returns false when a rank is duplicated', () => {
      const invalid = { a: 1, b: 1, c: 3, d: 4 };
      expect(validateRankings(invalid)).toBe(false);
    });

    it('returns false when a rank is out of range', () => {
      const invalid = { a: 0, b: 2, c: 3, d: 4 };
      expect(validateRankings(invalid)).toBe(false);
    });
  });

  describe('end-to-end column and quadrant calculations', () => {
    // Using a fixed ranking pattern: a:1, b:2, c:3, d:4
    const rankPattern = { a: 1, b: 2, c: 3, d: 4 };
    const userRankings = buildUserRankings(rankPattern);

    const columnTotalsExpected = { 1: 0, 2: 0, 3: 0, 4: 0 };
    wordSets
      .filter(({ row }) => !excludedRows.includes(row))
      .forEach(() => {
        columnTotalsExpected[1] += 4; // a -> column 1, score 4
        columnTotalsExpected[2] += 3; // b -> column 2, score 3
        columnTotalsExpected[3] += 2; // c -> column 3, score 2
        columnTotalsExpected[4] += 1; // d -> column 4, score 1
      });

    const percentagesExpected = {};
    const totalScore = Object.values(columnTotalsExpected).reduce((sum, v) => sum + v, 0);
    Object.keys(columnTotalsExpected).forEach((col) => {
      const quadrant = columnToQuadrant[col];
      percentagesExpected[quadrant] = Math.round((columnTotalsExpected[col] / totalScore) * 100);
    });

    it('calculates correct column totals', () => {
      const totals = calculateColumnTotals(userRankings, wordSets);
      expect(totals).toEqual(columnTotalsExpected);
    });

    it('calculates correct quadrant percentages', () => {
      const percentages = calculateQuadrantPercentages(columnTotalsExpected);
      expect(percentages).toEqual(percentagesExpected);
    });

    it('identifies the dominant quadrant', () => {
      const dominant = getDominantQuadrant(percentagesExpected);
      // In our rank pattern, column 1 (implementer) has highest percentage
      expect(dominant).toBe('implementer');
    });

    it('sorts quadrants in descending order', () => {
      const sorted = getSortedQuadrants(percentagesExpected);
      const sortedQuadrantNames = sorted.map((q) => q.quadrant);
      expect(sortedQuadrantNames).toEqual(['implementer', 'generator', 'conceptualizer', 'optimizer']);
    });
  });
}); 