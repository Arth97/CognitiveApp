
// import './NumberMemory.css';
import React, { useState, useEffect } from 'react';

import { useNumberStore, usePageStatusStore } from '../../state/numberMemoryState';

export const InputNumber = (props) => {

  const { userNumber, setUserNumber, randomNumber, level, incrementLevel, resetLevel } = useNumberStore();
  const { setShowResults, setTimeOutEnded, setShowAnswer } = usePageStatusStore();


  const handleInputChange = (event) => {
    setUserNumber(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    setTimeOutEnded(false);
    setShowAnswer(true)
  };

  return (
    <>
      <input
        type="text"
        value={userNumber}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
      />
      <button onClick={checkAnswer}>Aceptar</button>
    </>
  );
};
