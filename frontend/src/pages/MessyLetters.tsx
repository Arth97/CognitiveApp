// MessyLetters.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from '../utils/chartUtils';
import { InputWordList } from '../components/inputWordList';

export const MessyLetters = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [step, setStep] = useState(1);
  const [correctWord, setCorrectWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0)

  const navigate = useNavigate();

  const wordList = ['react', 'javascript', 'developer', 'component', 'state'];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const shuffleWord = (word) => {
    const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffledWord;
  };

  const handleNext = () => {
    if (step === 1) {
      const newWord = getRandomWord();
      setCorrectWord(newWord)
      setCurrentWord(shuffleWord(newWord));
      setStep(2);
    }
  };

  const handleVerify = () => {
    const isInputCorrect = userInput.toLowerCase() === correctWord.toLowerCase();
    setIsCorrect(isInputCorrect);
    setStep(3);
  };

  const handleNextOrResults = () => {
    if (isCorrect) {
      setScore(score+1)
      setStep(1);
    } else {
      setStep(4);
    }
  };

  return (
    <div className="main-container">
      {saveNewData && (step===1) && (
        <InputWordList gameName={'messyLetters'} />
      )}
      {!saveNewData && (
        <>
          <button onClick={() => navigate('/home')} className="top-button-left"> Volver al menú </button>
          <button onClick={() => setSaveNewData(true)} className="top-button-right"> Guardar nuevos datos </button>
          <div className="inside-container" style={{minWidth: '320px'}}>
            <h2>VOCABULARIO</h2>
            {step === 1 && (
              <>
                <p>Ordena la siguiente palabra</p>
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
                  Comenzar
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <p>Palabra Desordenada: {currentWord}</p>
                <input
                  type="text"
                  placeholder="Escribe la palabra correcta"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button onClick={handleVerify} style={{ marginLeft: '1em', marginTop: '1em' }}>
                  Verificar
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <p>
                  {isCorrect ? '¡Correcto!' : (
                    <>
                      Incorrecto. <br />
                      La palabra correcta es: <span style={{color: 'green'}}>{correctWord}</span>
                    </>
                  )}
                </p>
                <button onClick={handleNextOrResults} style={{ marginTop: '1em' }}>
                  {isCorrect ? 'Siguiente' : 'Resultados'}
                </button>
              </>
            )}
            {step === 4 && (
              <>
                <p>Tu puntuación: {score}</p>
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
                  Terminar
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};