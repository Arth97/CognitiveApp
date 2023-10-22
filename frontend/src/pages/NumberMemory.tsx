import './NumberMemory.css';
import React, { useState, useEffect, useContext } from 'react';

import { AnswerView } from '../components/NumberMemory/answerComponent';
import { InputNumber } from '../components/NumberMemory/inputNumberComponent';
import { ResultView } from '../components/NumberMemory/resultComponent';
import { ShowNumber } from '../components/NumberMemory/showNumberComponent';

import { ScoreApi } from '../api/backApi';

import UserInfoContext from '../context/userInfoContext';

import { useUserInfoStore } from '../state/userState';
import { useNumberStore, usePageStatusStore } from '../state/numberMemoryState';

export const NumberMemory = () => {
  const [progress, setProgress] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // const {userInfo} = useContext(UserInfoContext)
  const { userInfo } = useUserInfoStore();
  const { userNumber, setUserNumber, randomNumber, setRandomNumber, level, resetLevel } = useNumberStore();
  const { isGameStarted, showResults, timeOutEnded, showAnswer, setIsGameStarted, setShowResults, setTimeOutEnded, setShowAnswer } = usePageStatusStore();

  // const scoreApi = new ScoreApi();

  useEffect(() => {
    if (!isGameStarted) return;
    if (randomNumber !== null && !timeOutEnded) {
      const id = setTimeout(() => {
        setTimeOutEnded(true);
      }, 5000);
      setTimerId(id);
    }

    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };    
  }, [isGameStarted, level]);  

  const startGame = () => {
    const number = Math.floor(Math.random() * 1001);
    // setUserInput('');
    setUserNumber('');
    setRandomNumber(number);
    setProgress(0);
    // resetPoints();
    // resetLevel();
    setIsGameStarted(true);
    setTimeOutEnded(false);
    setShowAnswer(false);
    setShowResults(false);

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
    setIsGameStarted(false);
    setTimeOutEnded(false);
    setShowAnswer(false);
    resetLevel();
  };

  return (
    <div className="main-container">
      <h2>Juego de Números Aleatorios</h2>
      {/* Mejorar todo el siguiente bloque, usar nombres mas descriptivos y mejorar desarrollo */}

      {/* Pantalla del temporizador */}
      { isGameStarted && !timeOutEnded && !showAnswer && !showResults && (
        <ShowNumber progress={progress} />
      )}     

      {/* Pantalla de introducir numero post temporizador */}
      { isGameStarted && timeOutEnded && !showAnswer && !showResults && (
        <InputNumber />
      )}

      {/* En esta mostrar numero temporizado y el del input (quiza tambien para cuando se falla) */}
      { isGameStarted && !timeOutEnded && showAnswer && !showResults && (
        <AnswerView startGame={startGame} />
      )}

      { isGameStarted && showResults && (
        <div style={{textAlign: 'center', fontWeight: 'bold'}}>
          <p>Puntuación</p>
          <p>{level}</p>
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

      {/* Pantalla final despues de fallar mostrando resultado mas ChartJs */}
      { isGameStarted && showResults && (
        <ResultView />
      )}

    </div>
  );
};
