// WordList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialWordList = [
  'Palabra1', 'Palabra2', 'Palabra3', 'Palabra4', 'Palabra5',
  'Palabra6', 'Palabra7', 'Palabra8', 'Palabra9', 'Palabra10'
];

export const WordList = () => {
  const navigate = useNavigate();
  const [wordList, setWordList] = useState(initialWordList);
  const [userInput, setUserInput] = useState(Array(initialWordList.length).fill(''));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(1);

  const handleStart = () => {
    setGameStarted(true);
    setStep(2);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleVerify = () => {
    const newScore = userInput.filter((input, index) => input.toLowerCase() === wordList[index].toLowerCase()).length;
    setScore(newScore);

    setUserInput(Array(wordList.length).fill(''));
    setStep(step + 1);
  };

  const renderWordInput = (index) => (
    <input
      key={index}
      type="text"
      placeholder="Introduce la palabra"
      value={userInput[index]}
      style={{ width: '174px' }}
      onChange={(e) => {
        const updatedUserInput = [...userInput];
        updatedUserInput[index] = e.target.value;
        setUserInput(updatedUserInput);
      }}
    />
  );

  return (
    <div className="main-container">
      <button onClick={() => navigate('/home')} className='top-button-left'>Volver al menú</button>
      <button onClick={() => null} className='top-button-right'>Guardar nuevos datos</button>
      <div className="inside-container">
        <h2>MEMORIZACIÓN</h2>
        {step === 1 && (
          <>
            <p>Recuerda la lista de palabras</p>            
            <button onClick={handleStart} style={{ marginTop: '1em' }}>
              Comenzar
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p>Recuerda la lista de palabras</p>
            <ul>
              {wordList.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
            <button onClick={handleNext} style={{ marginTop: '1em' }}>
              Siguiente
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p>Introduce las palabras que recuerdas:</p>
            <div style={{maxWidth: '420px', overflow: 'visible'}}>
              {wordList.map((word, index) => (
                <span key={index}>
                  {renderWordInput(index)}{' '}
                </span>
              ))}
            </div>
            <button onClick={handleVerify} style={{ marginTop: '1em' }}>
              Verificar
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <p>Tu puntuación: {score}</p>
            <button onClick={handleNext} style={{ marginTop: '1em' }}>
              Siguiente
            </button>
          </>
        )}
      </div>
    </div>
  );
};

