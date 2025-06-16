// Basadur Profile Word Sets
// 18 sets of 4 words each, mapped to columns (dimensions)
// Column 1: Experiencing -> Implementer
// Column 2: Ideation -> Generator  
// Column 3: Thinking -> Conceptualizer
// Column 4: Evaluation -> Optimizer

export const wordSets = [
  // Set 1 (Row 1 - excluded from scoring)
  {
    row: 1,
    words: [
      { letter: "a", text: "Competitive", definition: "Striving to win or be better than others", column: 4 },
      { letter: "b", text: "Analytical", definition: "Examining things in detail to understand them", column: 3 },
      { letter: "c", text: "Emotional", definition: "Showing strong feelings and being moved by emotions", column: 1 },
      { letter: "d", text: "Creative", definition: "Having the ability to produce original and imaginative ideas", column: 2 }
    ]
  },
  // Set 2 (Row 2 - excluded from scoring)
  {
    row: 2,
    words: [
      { letter: "a", text: "Accepting", definition: "Open to receiving ideas without immediately judging them", column: 1 },
      { letter: "b", text: "Risk-taking", definition: "Willing to try new things despite potential failure", column: 2 },
      { letter: "c", text: "Evaluative", definition: "Carefully assessing the worth or quality of something", column: 4 },
      { letter: "d", text: "Aware", definition: "Having knowledge or perception of a situation", column: 3 }
    ]
  },
  // Set 3 (Row 3 - included in scoring)
  {
    row: 3,
    words: [
      { letter: "a", text: "Ready", definition: "Prepared and willing to act immediately", column: 2 },
      { letter: "b", text: "Realistic", definition: "Having a practical understanding of what can be achieved", column: 4 },
      { letter: "c", text: "Feeling", definition: "Experiencing emotions and being guided by them", column: 1 },
      { letter: "d", text: "Rational", definition: "Based on logical thinking and reasoning", column: 3 }
    ]
  },
  // Set 4 (Row 4 - included in scoring)
  {
    row: 4,
    words: [
      { letter: "a", text: "Intuitive", definition: "Understanding or knowing something without conscious reasoning", column: 1 },
      { letter: "b", text: "Productive", definition: "Achieving a significant amount of useful work", column: 4 },
      { letter: "c", text: "Logical", definition: "Following clear, rational principles of reasoning", column: 3 },
      { letter: "d", text: "Questioning", definition: "Asking probing questions to understand better", column: 2 }
    ]
  },
  // Set 5 (Row 5 - excluded from scoring)
  {
    row: 5,
    words: [
      { letter: "a", text: "Learning", definition: "Acquiring new knowledge or skills", column: 1 },
      { letter: "b", text: "Creating", definition: "Bringing something new into existence", column: 2 },
      { letter: "c", text: "Analyzing", definition: "Breaking down complex information into parts", column: 3 },
      { letter: "d", text: "Doing", definition: "Taking action and getting things accomplished", column: 4 }
    ]
  },
  // Set 6 (Row 6 - included in scoring)
  {
    row: 6,
    words: [
      { letter: "a", text: "Personal", definition: "Related to individual feelings and experiences", column: 1 },
      { letter: "b", text: "Factual", definition: "Based on actual information and evidence", column: 3 },
      { letter: "c", text: "Inventive", definition: "Having the ability to create new solutions", column: 2 },
      { letter: "d", text: "Practical", definition: "Concerned with actual use rather than theory", column: 4 }
    ]
  },
  // Set 7 (Row 7 - included in scoring)
  {
    row: 7,
    words: [
      { letter: "a", text: "Specific", definition: "Clearly defined and precisely detailed", column: 4 },
      { letter: "b", text: "Involved", definition: "Actively participating and engaged", column: 1 },
      { letter: "c", text: "Broad", definition: "Wide-ranging and comprehensive in scope", column: 2 },
      { letter: "d", text: "Systematic", definition: "Done according to a organized plan or method", column: 3 }
    ]
  },
  // Set 8 (Row 8 - included in scoring)
  {
    row: 8,
    words: [
      { letter: "a", text: "Watching", definition: "Observing carefully to understand", column: 3 },
      { letter: "b", text: "Relating", definition: "Connecting with others and building relationships", column: 1 },
      { letter: "c", text: "Acting", definition: "Taking decisive steps to achieve goals", column: 4 },
      { letter: "d", text: "Thinking", definition: "Using mental processes to consider ideas", column: 2 }
    ]
  },
  // Set 9 (Row 9 - included in scoring)
  {
    row: 9,
    words: [
      { letter: "a", text: "Intense", definition: "Having strong focus and concentration", column: 1 },
      { letter: "b", text: "Practical", definition: "Focused on real-world application", column: 4 },
      { letter: "c", text: "Academic", definition: "Scholarly and theoretical in approach", column: 3 },
      { letter: "d", text: "Adventurous", definition: "Willing to take risks and try new experiences", column: 2 }
    ]
  },
  // Set 10 (Row 10 - excluded from scoring)
  {
    row: 10,
    words: [
      { letter: "a", text: "Observing", definition: "Watching and noting details carefully", column: 3 },
      { letter: "b", text: "Feeling", definition: "Being aware of and responding to emotions", column: 1 },
      { letter: "c", text: "Thinking", definition: "Engaging in mental consideration", column: 2 },
      { letter: "d", text: "Doing", definition: "Actively working and implementing", column: 4 }
    ]
  },
  // Set 11 (Row 11 - included in scoring)
  {
    row: 11,
    words: [
      { letter: "a", text: "Immediate", definition: "Happening right now without delay", column: 1 },
      { letter: "b", text: "Reflective", definition: "Thoughtful and considering all angles", column: 3 },
      { letter: "c", text: "Pragmatic", definition: "Dealing with things practically and realistically", column: 4 },
      { letter: "d", text: "Conceptual", definition: "Dealing with ideas and abstract thinking", column: 2 }
    ]
  },
  // Set 12 (Row 12 - included in scoring)
  {
    row: 12,
    words: [
      { letter: "a", text: "Experience", definition: "Learning through direct involvement", column: 1 },
      { letter: "b", text: "Experimentation", definition: "Testing ideas through trial and exploration", column: 2 },
      { letter: "c", text: "Conceptualization", definition: "Forming ideas and theoretical frameworks", column: 3 },
      { letter: "d", text: "Application", definition: "Putting knowledge and ideas into practice", column: 4 }
    ]
  },
  // Set 13 (Row 13 - included in scoring)
  {
    row: 13,
    words: [
      { letter: "a", text: "Committed", definition: "Dedicated and loyal to a course of action", column: 1 },
      { letter: "b", text: "Seeking", definition: "Looking for new possibilities and opportunities", column: 2 },
      { letter: "c", text: "Challenging", definition: "Questioning and testing ideas rigorously", column: 4 },
      { letter: "d", text: "Developing", definition: "Building and improving ideas systematically", column: 3 }
    ]
  },
  // Set 14 (Row 14 - excluded from scoring)
  {
    row: 14,
    words: [
      { letter: "a", text: "Concrete", definition: "Real, tangible, and specific", column: 1 },
      { letter: "b", text: "Active", definition: "Energetic and taking initiative", column: 2 },
      { letter: "c", text: "Reflective", definition: "Thoughtful and contemplative", column: 3 },
      { letter: "d", text: "Pragmatic", definition: "Practical and results-oriented", column: 4 }
    ]
  },
  // Set 15 (Row 15 - included in scoring)
  {
    row: 15,
    words: [
      { letter: "a", text: "Involved", definition: "Actively engaged and participating", column: 1 },
      { letter: "b", text: "Detached", definition: "Objective and maintaining emotional distance", column: 3 },
      { letter: "c", text: "Decisive", definition: "Making decisions quickly and confidently", column: 4 },
      { letter: "d", text: "Tentative", definition: "Cautious and open to changing direction", column: 2 }
    ]
  },
  // Set 16 (Row 16 - included in scoring)
  {
    row: 16,
    words: [
      { letter: "a", text: "Personal", definition: "Based on individual perspective and feelings", column: 1 },
      { letter: "b", text: "Perceptual", definition: "Related to how things are sensed and understood", column: 2 },
      { letter: "c", text: "Intellectual", definition: "Using reasoning and analytical thinking", column: 3 },
      { letter: "d", text: "Practical", definition: "Focused on useful and applicable solutions", column: 4 }
    ]
  },
  // Set 17 (Row 17 - excluded from scoring)
  {
    row: 17,
    words: [
      { letter: "a", text: "Feeling", definition: "Being guided by emotions and personal values", column: 1 },
      { letter: "b", text: "Trying", definition: "Attempting new approaches and methods", column: 2 },
      { letter: "c", text: "Thinking", definition: "Using logical analysis and reasoning", column: 3 },
      { letter: "d", text: "Doing", definition: "Taking action and implementing solutions", column: 4 }
    ]
  },
  // Set 18 (Row 18 - included in scoring)
  {
    row: 18,
    words: [
      { letter: "a", text: "Receptive", definition: "Open to new ideas and experiences", column: 1 },
      { letter: "b", text: "Relevant", definition: "Directly related and applicable to the situation", column: 2 },
      { letter: "c", text: "Analytical", definition: "Systematic examination and evaluation", column: 3 },
      { letter: "d", text: "Impartial", definition: "Fair and unbiased in judgment", column: 4 }
    ]
  }
];

// Rows excluded from scoring calculation
export const excludedRows = [1, 2, 5, 10, 14, 17];

// Column to quadrant mapping
export const columnToQuadrant = {
  1: 'implementer',
  2: 'generator', 
  3: 'conceptualizer',
  4: 'optimizer'
};

// Quadrant display names
export const quadrantNames = {
  implementer: 'IMPLEMENTER',
  generator: 'GENERATOR',
  conceptualizer: 'CONCEPTUALIZER', 
  optimizer: 'OPTIMIZER'
};

// Color themes for each quadrant
export const quadrantThemes = {
  generator: {
    bright: '#A0E1E1',
    dark: '#21231D',
    name: 'Generator'
  },
  conceptualizer: {
    bright: '#FFEB69', 
    dark: '#3A341C',
    name: 'Conceptualizer'
  },
  optimizer: {
    bright: '#FFC091',
    dark: '#260A2F', 
    name: 'Optimizer'
  },
  implementer: {
    bright: '#FFD7EF',
    dark: '#320707',
    name: 'Implementer'
  }
}; 