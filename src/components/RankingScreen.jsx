import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppContext } from '../App';
import ProgressBar from './common/ProgressBar';
import Button from './common/Button';

const EXPAND_ANIMATION_DURATION = 300;
const EXPAND_TRANSITION = `all ${EXPAND_ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;

// SortableItem component for individual words
function SortableItem({ word, isExpanded, onToggleExpand, theme }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: word.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: isExpanded ? 'auto' : '72px',
    userSelect: 'none',
    position: 'relative',
    touchAction: 'none',
    willChange: 'transform',
    display: 'flex',
    flexDirection: 'column',
    opacity: isDragging ? 0.95 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const cardStyle = {
    borderRadius: '24px',
    border: `1px solid ${isDragging ? theme.fill : '#D3D3D3'}`,
    backgroundColor: '#FFFFFF',
    boxShadow: isDragging 
      ? `0 16px 40px rgba(0,0,0,0.25), 0 0 0 2px ${theme.fill}20`
      : '0 2px 4px rgba(0,0,0,0.04)',
    transition: isDragging ? 'none' : 'all 150ms ease-out',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div style={cardStyle}>
        <div {...listeners} style={{
          padding: isExpanded ? '16px 16px 8px 16px' : '14px 16px',
          cursor: isDragging ? 'grabbing' : 'grab',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
        }}>
          {/* Left side: Drag handle + Word */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1
          }}>
            {/* Drag Handle */}
            <div style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isDragging ? 1 : 0.7
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="10.5" cy="8.16667" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
                <circle cx="17.5" cy="8.16667" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
                <circle cx="10.5" cy="14" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
                <circle cx="17.5" cy="14" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
                <circle cx="10.5" cy="19.8333" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
                <circle cx="17.5" cy="19.8333" r="1.16667" fill={isDragging ? theme.fill : "#2E2E2E"}/>
              </svg>
            </div>

            {/* Word with letter prefix */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1
            }}>
              <span style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '15px',
                fontWeight: '400',
                color: '#666666'
              }}>
                {word.letter.toLowerCase()}.
              </span>
              <span style={{
                fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                color: isDragging ? theme.text : '#000000'
              }}>
                {word.text}
              </span>
            </div>
          </div>

          {/* Info Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(word.letter);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 200ms ease',
              backgroundColor: 'transparent'
            }}
          >
            <div style={{
              transition: 'transform 200ms ease',
              transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'
            }}>
              {isExpanded ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8L6 14L7.4 15.4L12 10.8L16.6 15.4L18 14L12 8Z" fill="#6C6C6C"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14V9H9.5M9.5 14H10.5M10 6.5V6" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        </div>
        
        {/* Expandable content with smooth transition */}
        <div style={{
          maxHeight: isExpanded ? '200px' : '0',
          overflow: 'hidden',
          transition: EXPAND_TRANSITION,
          padding: isExpanded ? '0 16px 20px 52px' : '0 16px',
          opacity: isExpanded ? 1 : 0,
          backgroundColor: '#FFFFFF',
          marginTop: isExpanded ? '-8px' : '0'
        }}>
          <div style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#212121',
          }}>
            {word.definition}
          </div>
        </div>
      </div>
    </div>
  );
}

const RankingScreen = () => {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const { state, dispatch, wordSets } = useAppContext();
  
  const currentQuestionNum = parseInt(questionNumber);
  const currentQuestionSet = wordSets.find(set => set.row === currentQuestionNum);
  
  const [words, setWords] = useState([]);
  const [expandedWord, setExpandedWord] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [isInitialized, setIsInitialized] = useState(false);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Initialize words from current question set
  useEffect(() => {
    if (currentQuestionSet && currentQuestionNum) {
      setExpandedWord(null);
      setIsInitialized(false);
      
      const existingRankings = state.userRankings[currentQuestionNum];
      
      if (existingRankings) {
        const sortedWords = [...currentQuestionSet.words].sort((a, b) => {
          return existingRankings[a.letter] - existingRankings[b.letter];
        });
        const wordsWithIds = sortedWords.map(word => ({
          ...word,
          id: `${currentQuestionNum}-${word.letter}`
        }));
        setWords(wordsWithIds);
      } else {
        const alphabeticalWords = [...currentQuestionSet.words].sort((a, b) => 
          a.letter.localeCompare(b.letter)
        );
        const wordsWithIds = alphabeticalWords.map(word => ({
          ...word,
          id: `${currentQuestionNum}-${word.letter}`
        }));
        setWords(wordsWithIds);
      }
      
      setIsInitialized(true);
    }
  }, [currentQuestionNum, currentQuestionSet, state.userRankings]);

  // Save rankings whenever word order changes
  useEffect(() => {
    // Skip effect if not ready or invalid state
    if (!isInitialized || words.length !== 4) return;

    // Memoize rankings calculation
    const newRankings = {};
    words.forEach((word, index) => {
      newRankings[word.letter] = index + 1;
    });

    // Get existing rankings from state
    const existingRankings = state.userRankings[currentQuestionNum];

    // Deep compare rankings to prevent unnecessary updates
    const hasChanged = !existingRankings || 
      Object.keys(newRankings).some(letter => 
        newRankings[letter] !== existingRankings[letter]
      );

    // Only dispatch if rankings actually changed
    if (hasChanged) {
      // Debounce save status updates
      const saveStatusTimeout = setTimeout(() => {
        setSaveStatus('saving');
        
        // Dispatch ranking update
        dispatch({
          type: 'UPDATE_RANKINGS',
          questionNumber: currentQuestionNum,
          rankings: newRankings
        });

        // Show saved status briefly
        const savedTimeout = setTimeout(() => {
          setSaveStatus('saved');
          const hideTimeout = setTimeout(() => {
            setSaveStatus('idle');
          }, 2000);
          return () => clearTimeout(hideTimeout);
        }, 300);

        return () => clearTimeout(savedTimeout);
      }, 100);

      return () => clearTimeout(saveStatusTimeout);
    }
  }, [
    words,               // Only when word order changes
    isInitialized,       // Only when initialization state changes
    currentQuestionNum,  // Only when question number changes
    dispatch,            // Stable dispatch function
    state.userRankings   // Only when rankings in global state change
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setWords((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        
        return newItems;
      });
    }
  };

  const handleToggleExpand = (letter) => {
    setExpandedWord(prev => prev === letter ? null : letter);
  };

  const handleNext = () => {
    if (currentQuestionNum === 6) {
      navigate('/checkpoint/midpoint');
    } else if (currentQuestionNum === 12) {
      navigate('/checkpoint/final');
    } else if (currentQuestionNum === 18) {
      navigate('/name-collection');
    } else {
      navigate(`/question/${currentQuestionNum + 1}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionNum === 1) {
      navigate('/');
    } else if (currentQuestionNum === 7) {
      navigate('/checkpoint/midpoint');
    } else if (currentQuestionNum === 13) {
      navigate('/checkpoint/final');
    } else {
      navigate(`/question/${currentQuestionNum - 1}`);
    }
  };

  // Theme based on question number
  const theme = useMemo(() => {
    if (currentQuestionNum <= 6) {
      return { fill: '#A0E1E1', background: 'rgba(0, 0, 0, 0.08)', text: '#21231D' };
    } else if (currentQuestionNum <= 12) {
      return { fill: '#FFEB69', background: 'rgba(0, 0, 0, 0.08)', text: '#3A341C' };
    } else {
      return { fill: '#FFC091', background: 'rgba(0, 0, 0, 0.08)', text: '#260A2F' };
    }
  }, [currentQuestionNum]);

  const questionRange = useMemo(() => {
    if (currentQuestionNum <= 6) return '1-6';
    if (currentQuestionNum <= 12) return '7-12';
    return '13-18';
  }, [currentQuestionNum]);

  if (!currentQuestionSet || !isInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'IBM Plex Sans, sans-serif'
      }}>
        Loading question {currentQuestionNum}...
      </div>
    );
  }

  return (
    <>
      {/* CSS Animation for save status */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}
      </style>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'IBM Plex Sans, sans-serif',
        overflow: 'hidden'
      }}>
        {/* Progress Bar and Instructions */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '40px',
          transform: 'translateX(-50%)',
          width: '520px',
          maxWidth: '90vw'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <ProgressBar
              current={currentQuestionNum}
              total={18}
              theme={theme}
              showText={true}
            />

            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: '16px',
              color: '#777777',
              margin: 0,
              letterSpacing: '-0.16px',
              textAlign: 'center'
            }}>
              Drag to rank—top is most like you. Tap ⓘ for definitions.
            </p>
          </div>
        </div>

        {/* Main Ranking Container */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '520px',
          maxWidth: '90vw'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '100%', position: 'relative' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 20px'
              }}>
                <div style={{ 
                  width: '400px', 
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  position: 'relative',
                  transform: 'translateZ(0)',
                  padding: '8px'
                }}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={words.map(w => w.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        minHeight: '320px'
                      }}>
                        {words.map((word) => (
                          <SortableItem
                            key={word.id}
                            word={word}
                            isExpanded={expandedWord === word.letter}
                            onToggleExpand={handleToggleExpand}
                            theme={theme}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>

            {/* Save Status */}
            {saveStatus === 'saved' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
                backgroundColor: '#FFFFFF',
                padding: '8px 16px',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #E8E8E8',
                zIndex: 1000,
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                <span style={{
                  fontFamily: 'IBM Plex Sans, sans-serif',
                  fontSize: '14px',
                  color: '#494949',
                  fontWeight: '500'
                }}>
                  Changes saved
                </span>
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#129729',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: '40px',
          transform: 'translateX(-50%)',
          width: '520px',
          maxWidth: '90vw'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button
              onClick={handleBack}
              variant="ranking-back"
              style={{
                width: '120px',
                height: '60px',
                borderRadius: '28px',
                backgroundColor: '#F1F1F1',
                color: '#121212',
                fontFamily: 'Martian Mono, JetBrains Mono, monospace',
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '0.28px',
                padding: '16px',
                minWidth: 'unset',
                minHeight: 'unset'
              }}
            >
              ← Back
            </Button>
            
            <Button
              onClick={handleNext}
              variant="ranking-next"
              questionRange={questionRange}
              style={{
                width: '224px',
                height: '60px',
                borderRadius: '28px',
                backgroundColor: theme.fill,
                color: theme.text,
                fontFamily: 'Martian Mono, JetBrains Mono, monospace',
                fontSize: '14px',
                fontWeight: '500',
                padding: '16px',
                minWidth: 'unset',
                minHeight: 'unset'
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RankingScreen; 