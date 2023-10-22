import React, { useState, useEffect } from 'react';

export const QuickReflex = () => {
  const [circleColor, setCircleColor] = useState('red');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [reactionTime, setReactionTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isClickedEarly, setIsClickedEarly] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      const reactionTimeout = setTimeout(() => {
        setCircleColor('green');
        setStartTime(new Date());
      }, getRandomTime());
      return () => clearTimeout(reactionTimeout);
    }
  }, [isGameStarted]);

  const getRandomTime = () => {
    // Genera un tiempo aleatorio entre 1 y 10 segundos en milisegundos
    return Math.floor(Math.random() * 10000) + 1000;
  };

  const handleCircleClick = () => {
    if (circleColor === 'green' && startTime) {
      const endTime = new Date();
      const timeDifference = endTime.getTime() - startTime.getTime();
      setReactionTime(timeDifference);
      setCircleColor('red');
      setIsGameStarted(false);
      setIsClickedEarly(false);
    } else {
      setIsClickedEarly(true);
      setIsGameStarted(false);
      setReactionTime(0);
    }
  };

  const handleStartGame = () => {
    setCircleColor('red');
    setIsGameStarted(true);
    setIsClickedEarly(false);
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setReactionTime(0);
    setIsClickedEarly(false);
  };

  return (
    <div className="main-container">
      <h2>Quick Reflex - Minijuego de Reacción</h2>
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: circleColor,
          margin: '30px auto',
          cursor: 'pointer'
        }}
        onClick={handleCircleClick}
      ></div>
      {!isGameStarted ? (
        <button onClick={handleStartGame}>Comenzar</button>
      ) : (
        <button onClick={handleRestartGame}>Reiniciar</button>
      )}
      {isClickedEarly && (
        <p>¡Hiciste clic antes de que el círculo se ponga en verde!</p>
      )}
      {reactionTime > 0 && !isClickedEarly && (
        <p>Tiempo de reacción: {reactionTime} milisegundos</p>
      )}
    </div>
  );
};