import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const StroopEffect = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const [currentColor, setCurrentColor] = useState('');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    updateColor();
  }, []);

  const updateColor = () => {
    let newIndex = Math.floor(Math.random() * colors.length);
    setCurrentColorIndex(newIndex);
    newIndex = Math.floor(Math.random() * colors.length);
    setCurrentColor(colors[newIndex]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === colors[currentColorIndex]) {
      setScore(score + 1);
    }
    updateColor();
    setUserInput('');
  };

  return (
    <div className="main-container">
      <button onClick={() => navigate('/home')} className="top-button-left"> Volver al menú </button>
      <button onClick={() => null} className="top-button-right"> Guardar nuevos datos </button>
      <div className="inside-container" style={{ textAlign: 'center' }}>
        <p style={{ color: colors[currentColorIndex], fontSize: '62px' }}>{currentColor}</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em' }}>
          <div style={{ width: '135px', height: '135px', backgroundColor: 'black', marginRight: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>{currentColor}</div>
          <div style={{ width: '135px', height: '135px', backgroundColor: 'black', marginLeft: '20px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>{colors[currentColorIndex]}</div>
        </div>
        <p style={{marginTop: '1em'}}>Puntuación: {score}</p>
      </div>
    </div>
  );
};
