// MessyLetters.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from '../utils/chartUtils';
import { InputWordList } from '../components/inputWordList';
import { ResultView } from '../components/resultComponent';
import { GameApi } from '../api/backApi';

export const MessyLetters = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [step, setStep] = useState(1);
  const [correctWord, setCorrectWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0)
  const [gameData, setGameData] = useState(null);
  const [wordList, setWordList] = useState([]);

  const navigate = useNavigate();

  // const wordList = ['react', 'javascript', 'developer', 'component', 'state'];

  const gameApi = new GameApi();

  // TODO: Revisar si falt alo mismo que en wordList

  useEffect(() => {
    const retriveData = async () => {
      const data = await gameApi.getGameDataByName('messyLetters')
      setGameData(data.data); // TODO: Modificar el back para no tener tanto data.data anidado en el objeto de respuesta
      console.log("data.data", data.data)
    }
    retriveData();
  },[])

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const shuffleWord = (word) => {
    const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffledWord;
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else {
      const newWord = getRandomWord();
      setCorrectWord(newWord)
      setCurrentWord(shuffleWord(newWord));
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
      setStep(5);
    }
  };

  const handleGameDataSelection = (data) => {
    const selectedWordList = gameData.find((gData) => gData.listName === data.listName).wordList
    setWordList(selectedWordList)
    setStep(3);
  }

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
                <p>Selecciona un conjunto de palabras</p>
                {gameData && (
                  <div>
                    {gameData.map((data, index) => (
                      <button key={index} onClick={() => handleGameDataSelection(data)} style={{ marginTop: '1em', marginRight: '1em' }}>
                        {data.listName}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
            {step === 3 && (
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
            {step === 4 && (
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
            {step === 5 && (
              <>
                <p>Tu puntuación: {score}</p>
                <button onClick={handleNext} style={{ marginTop: '1em' }}>
                  Terminar
                </button>
                <ResultView gameName={'messyLetters'}/>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};