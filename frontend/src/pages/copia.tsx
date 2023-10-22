import './NumberMemory.css';
import React, { useState, useEffect } from 'react';

export const NumberMemory = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeOutEnded, setTimeOutEnded] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (randomNumber !== null) {
      const id = setTimeout(() => {
        //setRandomNumber(null);
        //setProgress(0);
        //setIsGameStarted(false);
        setTimeOutEnded(true);
      }, 5000);
      setTimerId(id);
    }

    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };    
  }, [isGameStarted]);

  const startGame = () => {
    const number = Math.floor(Math.random() * 1001);
    setRandomNumber(number);
    setProgress(0);
    setIsGameStarted(true);
    setTimeOutEnded(false);

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(intervalId);
          return prevProgress;
        }
        return prevProgress + 20;
      });
    }, 1000);

    setTimerId(intervalId);
  };

  const stopGame = () => {
    clearTimeout(timerId);
    setRandomNumber(null);
    setUserInput('');
    setProgress(0);
    setIsGameStarted(false);
    setTimeOutEnded(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (parseInt(userInput) === randomNumber) {
      setTimeOutEnded(false);
      setUserInput('');
      stopGame();
      alert('¡Respuesta correcta!');
    } else {
      setTimeOutEnded(false);
      setUserInput('');
      stopGame();
      alert('Respuesta incorrecta. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="main-container">
      <h2>Juego de Números Aleatorios</h2>
      {isGameStarted && !timeOutEnded && (
        <>
          <p>Memoriza el número:</p>
          <p>{randomNumber}</p>
        </>
      )}
      {timeOutEnded && (
        <input
        type="number"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
      />
      )}
      {progress > 0 && progress < 100 && (
        <div>
          <div
            style={{ width: `${progress}%`, height: '10px', background: 'green' }}
          ></div>
        </div>
      )}
      <div className="number-memory-menu-btns">
        <button onClick={stopGame} disabled={!isGameStarted} className="number-memory-menu-btn">
          Stop
        </button>
        <button onClick={startGame} disabled={isGameStarted} className="number-memory-menu-btn">
          Start
        </button>
      </div>
    </div>
  );
};