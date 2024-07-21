import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChainedWords = () => {
  const [step, setStep] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      setCurrentWord(getRandomWord());
      setStep(2);
    }
  };

  const handleVerify = () => {
    const isInputCorrect = checkWord(userInput);
    setIsCorrect(isInputCorrect);
    setStep(3);
  };

  const handleNextOrResults = () => {
    if (isCorrect) {
      setCurrentWord(getRandomWord());
      setUserInput('');
      setStep(2);
    } else {
      navigate('/results'); // Cambia '/results' con tu página de resultados real
    }
  };

  const getRandomWord = () => {
    // Aquí deberías tener una lógica para obtener una palabra de algún origen (API, lista fija, etc.).
    // Por ahora, lo dejamos como una lista fija para fines demostrativos.
    const wordList = ['sol', 'luna', 'astronomía', 'álgebra', 'manzana', 'avión'];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const checkWord = (word) => {
    // Validación simple: la palabra ingresada debe comenzar con la última letra de la palabra actual.
    return word.toLowerCase().startsWith(currentWord.charAt(currentWord.length - 1));
  };

  return (
    <div className="main-container">
      <button onClick={() => navigate('/home')} className="top-button-left">Volver al menú</button>
      <button onClick={() => null} className="top-button-right">Guardar nuevos datos</button>
      <div className="inside-container">
        <h2>Palabras Encadenadas</h2>
        {step === 1 && (
          <>
            <p>Comienza la cadena con una palabra:</p>
            <button onClick={handleNext} style={{ marginTop: '1em' }}>
              Comenzar
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p>Palabra Actual: {currentWord}</p>
            <input
              type="text"
              placeholder="Escribe la siguiente palabra"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={handleVerify} style={{ marginTop: '1em' }}>
              Verificar
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <p>{isCorrect ? '¡Correcto!' : `Incorrecto. La palabra debe comenzar con la letra '${currentWord.charAt(currentWord.length - 1)}'.`}</p>
            <button onClick={handleNextOrResults} style={{ marginLeft: '1em', marginTop: '1em' }}>
              {isCorrect ? 'Siguiente' : 'Resultados'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
