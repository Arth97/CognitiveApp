import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const gridSizeForRound = (round) => {
  if (round <= 2) return 3;
  if (round <= 4) return 4;
  if (round <= 6) return 5;
  return 6;
};

const numberOfSquaresForRound = (round) => {
  if (round <= 2) return round + 2;
  if (round <= 4) return 4;
  return 8;
};

const generateRandomIndexes = (max, count) => {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
};

export const SquareMemory = () => {
  const [round, setRound] = useState(1);
  const [gridSize, setGridSize] = useState(gridSizeForRound(round));
  const [squaresToShow, setSquaresToShow] = useState(numberOfSquaresForRound(round));
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setStep(3);
      }, 3000);
    }
  };

  useEffect(() => {
    if (round > 9) {
      setIsGameOver(true);
    } else {
      setGridSize(gridSizeForRound(round));
      setSquaresToShow(numberOfSquaresForRound(round));
      setHighlightedSquares(generateRandomIndexes(gridSize * gridSize, squaresToShow));
      setUserSelection([]);
    }
  }, [round]);

  const handleSquareClick = (index) => {
    if (step === 3) {
      const newUserSelection = [...userSelection, index];
      setUserSelection(newUserSelection);

      if (newUserSelection.length === squaresToShow) {
        const isCorrect = newUserSelection.every((selectedIndex) =>
          highlightedSquares.includes(selectedIndex)
        );

        if (isCorrect) {
          setRound(round + 1);
          setStep(1);
        } else {
          setAnimationKey((prevKey) => prevKey + 1);
          setIsGameOver(true);

          // Para click erroneo
          setTimeout(() => {
            setUserSelection([]);
          }, 500);
        }
      }
    }
  };

  return (
    <>
      <div className="main-container">
        <button onClick={() => navigate('/home')} className="top-button-left">
          Volver al menú
        </button>
        <div className="inside-container">
          <h2>MEMORIA SECUENCIAL</h2>
          {step === 1 && (
            <>
              <p>Todo:</p>
              <button onClick={handleNext} style={{ marginTop: '1em' }}>
                Comenzar
              </button>
            </>
          )}
        </div>
        {step === 2 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '5px' }}>
              {Array.from({ length: gridSize * gridSize }, (_, index) => (
                <div
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: highlightedSquares.includes(index) ? 'yellow' : 'gray',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {highlightedSquares.includes(index) && 'X'}
                </div>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
           <>
           <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gap: '5px' }}>
              {Array.from({ length: gridSize * gridSize }, (_, index) => (
                <div
                  key={index}
                  onClick={() => handleSquareClick(index)}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: userSelection.includes(index) ? 'green' : 'gray',
                    border: '1px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    animation: userSelection.includes(index) ? `blink 0.5s ${animationKey}` : 'none',
                  }}
                >
                  {userSelection.includes(index) && 'X'}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
