// WordList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameApi, ScoreApi } from '../api/backApi';
import { useUserInfoStore } from '../state/userState';
import { ResultView } from '../components/resultComponent';
import { InputWordList } from '../components/inputWordList';

const initialWordList = [
  'Palabra1', 'Palabra2', 'Palabra3', 'Palabra4', 'Palabra5',
  'Palabra6', 'Palabra7', 'Palabra8', 'Palabra9', 'Palabra10'
];

export const WordList = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [wordList, setWordList] = useState(initialWordList);
  const [userInput, setUserInput] = useState(Array(initialWordList.length).fill(''));
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [allWordsCorrect, setAllWordsCorrect] = useState(false);

  const { userInfo } = useUserInfoStore();

  const navigate = useNavigate();
  const gameApi = new GameApi();
  const scoreApi = new ScoreApi();

  const handleStart = () => {
    setGameStarted(true);
    setScore(0);
    setStep(2);
  };

  const handleNext = () => {
    if (step===1) {
      if (!gameStarted) handleStart()
      //setUserInput(Array(wordList.length).fill(''));
      setStep(step + 1);
    }
    else if (step===3) handleVerify()
    else if (step === 4) {
      if(allWordsCorrect) setStep(1)
      else {setStep(5); saveScore();}
    }
    else if (step===5) setStep(1)
    else setStep(step + 1);
  };

  const handleVerify = () => {
    const newScore = userInput.filter((input, index) => input.toLowerCase() === wordList[index].toLowerCase()).length;
    setScore(score + newScore);
    setStep(step + 1);
    setAllWordsCorrect(userInput.every((input, index) => input.toLowerCase() === wordList[index].toLowerCase()))    
  };

  const saveScore = () => {
    scoreApi.saveScore({
      userId: userInfo.id,
      gameId: 'wordList',
      score: score,
      time: null
    })
    
  }

  const renderWordInput = (index) => {
    if (step === 3) {
      return (
        <input
          key={index}
          type="text"
          placeholder={`Introduce la palabra ${index+1}`}
          value={userInput[index]}
          style={{ width: '174px' }}
          onChange={(e) => {
            const updatedUserInput = [...userInput];
            updatedUserInput[index] = e.target.value;
            setUserInput(updatedUserInput);
          }}
        />
      )
    } else if (step === 4) {
      return (
        <input
          key={index}
          type="text"
          placeholder={userInput[index]}
          value={userInput[index]}
          readOnly={true}
          className={userInput[index].toLowerCase() === wordList[index].toLowerCase() ? 'correct' : 'incorrect'}
          style={{ width: '174px' }}
        />
      )
    }
  };

  return (
    <div className="main-container">
      {saveNewData && (step===1) && (
        <InputWordList gameName={'messyLetters'} />
      )}
      {!saveNewData && (
        <>        
          <button onClick={() => navigate('/home')} className='top-button-left'>Volver al menú</button>
          <button onClick={() => setSaveNewData(true)} className='top-button-right'>Guardar nuevos datos</button>
          <div className="inside-container">
            <h2>MEMORIZACIÓN</h2>
            {step === 1 && (
              <>
                <p>Recuerda la lista de palabras</p>            
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
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
            {(step === 3 || step === 4) && (
              <>
                <p>Introduce las palabras que recuerdas:</p>
                <div style={{maxWidth: '420px', overflow: 'visible'}}>
                  {wordList.map((word, index) => (
                    <span key={index}>
                      {renderWordInput(index)}{' '}
                    </span>
                  ))}
                </div>
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
                  {step===3 ? 'Verificar' : 'Siguiente'}
                </button>
              </>
            )}
            {step === 5 && (
              <>
                <p>Tu puntuación: {score}</p>
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
                  Terminar
                </button>
                <ResultView gameName={'wordList'}/>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

