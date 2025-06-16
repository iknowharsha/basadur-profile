// LocalStorage utilities for Basadur Profile app
const STORAGE_KEY = 'basadur_session';
const SESSION_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Initial state structure
const initialState = {
  currentScreen: 'landing',
  currentQuestion: 1,
  userRankings: {},
  userName: '',
  calculatedResults: null,
  sessionTimestamp: Date.now(),
  version: '1.0'
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    const stateToSave = {
      ...state,
      sessionTimestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.warn('Failed to save state to localStorage:', error);
  }
};

// Load state from localStorage
export const loadState = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return initialState;
    }

    const parsedData = JSON.parse(savedData);
    const now = Date.now();
    const sessionAge = now - parsedData.sessionTimestamp;

    // Check if session has expired (10 minute TTL)
    if (sessionAge > SESSION_TTL) {
      clearState();
      return initialState;
    }

    // Merge with initial state to ensure all properties exist
    return {
      ...initialState,
      ...parsedData
    };
  } catch (error) {
    console.warn('Failed to load state from localStorage:', error);
    return initialState;
  }
};

// Clear state from localStorage
export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear state from localStorage:', error);
  }
};

// Check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

// Get session age in minutes
export const getSessionAge = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    
    const parsedData = JSON.parse(savedData);
    const now = Date.now();
    const sessionAge = now - parsedData.sessionTimestamp;
    return Math.floor(sessionAge / (1000 * 60)); // Return age in minutes
  } catch (error) {
    return null;
  }
};

// Check if session is still valid
export const isSessionValid = () => {
  const age = getSessionAge();
  return age !== null && age < 10; // Valid if less than 10 minutes old
}; 