
// import './NumberMemory.css';
import React, { useState, useEffect } from 'react';

import { useNumberStore, usePageStatusStore } from '../../state/numberMemoryState';

export const AnswerView = (props) => {

  const { userNumber, randomNumber, level, incrementLevel, resetLevel } = useNumberStore();
  const { setShowResults, setTimeOutEnded, setShowAnswer } = usePageStatusStore();

  const correctAnswerd = (parseInt(userNumber)===randomNumber);

  /* useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [third]) */
  

  const goToNextLevel = () => {
    incrementLevel(level);
    setTimeOutEnded(false);
    setShowAnswer(false);
    props.startGame();
  };

  const goToResults = () => {
    setTimeOutEnded(false);
    setShowAnswer(false);
    setShowResults(true);
  };

  return (
    <>
      {correctAnswerd ? (
        <h2 style={{ color: 'green' }}>Correcto</h2>
      ) : (
        <h2 style={{ color: 'red' }}>Error</h2>
      )}
      <p>Tu número: {userNumber}</p>
      <p>Anterior número: {randomNumber}</p>
      <button onClick={ correctAnswerd ? goToNextLevel : goToResults}>Siguiente</button>
    </>
  );
};
