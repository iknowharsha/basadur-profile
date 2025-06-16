import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadState, saveState } from './utils/storage';
import { wordSets } from './data/wordSets';

// Import components
import LandingScreen from './components/LandingScreen';
import CheckpointScreen from './components/CheckpointScreen';
import RankingScreen from './components/RankingScreen';
import NameCollectionScreen from './components/NameCollectionScreen';
import FinalReportScreen from './components/FinalReportScreen';

// Create Context for global state
const AppContext = createContext();

// Initial state
const initialState = {
  currentScreen: 'landing',
  currentQuestion: 1,
  userRankings: {},
  userName: '',
  calculatedResults: null,
  sessionTimestamp: Date.now(),
  version: '1.0'
};

// Reducer for state management
const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    
    case 'SET_CURRENT_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.payload };
    
    case 'UPDATE_RANKINGS':
      return {
        ...state,
        userRankings: {
          ...state.userRankings,
          [action.questionNumber]: action.rankings
        }
      };
    
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    
    case 'SET_CALCULATED_RESULTS':
      return { ...state, calculatedResults: action.payload };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

// Debounce function for localStorage saves
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Context Provider Component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadState();
    dispatch({ type: 'LOAD_STATE', payload: savedState });
  }, []);

  // Debounced save function to prevent excessive localStorage writes
  const debouncedSave = useMemo(
    () => debounce((stateToSave) => {
      console.log('Saving state to localStorage');
      saveState(stateToSave);
    }, 500),
    []
  );

  // Save state to localStorage with debouncing
  useEffect(() => {
    // Don't save initial state or loading state
    if (state.sessionTimestamp !== initialState.sessionTimestamp) {
      debouncedSave(state);
    }
  }, [state, debouncedSave]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    wordSets
  }), [state]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Main App component
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/checkpoint/:type" element={<CheckpointScreen />} />
            <Route path="/question/:questionNumber" element={<RankingScreen />} />
            <Route path="/name-collection" element={<NameCollectionScreen />} />
            <Route path="/report" element={<FinalReportScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App; 