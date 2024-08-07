/* eslint-disable react-hooks/exhaustive-deps */
// MessyLetters.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputWordList } from '../../components/inputWordList';
import { ResultView } from '../../components/resultComponent';
import { GameApi, ScoreApi } from '../../api/backApi';
import { useUserInfoStore } from '../../state/userState';

export const MessyLetters = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [step, setStep] = useState(1);
  const [correctWord, setCorrectWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [previousWord, setPreviousWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0)
  const [gameData, setGameData] = useState(null);
  const [selectedWordList, setSelectedWordList] = useState(null);

  const navigate = useNavigate();

  // const wordList = ['react', 'javascript', 'developer', 'component', 'state'];

  const { userInfo } = useUserInfoStore();

  const gameApi = new GameApi();
  const scoreApi = new ScoreApi();

  // TODO: Revisar si falta lo mismo que en wordList

  useEffect(() => {
    const retriveData = async () => {
      const data = await gameApi.getGameDataByName('messyLetters')
      setGameData(data.data); // TODO: Modificar el back para no tener tanto data.data anidado en el objeto de respuesta
      console.log("data.data", data.data)
    }
    retriveData();
  },[]) 

  const handleNextOrResults = () => {
    console.log("SCOREEEE", score)
    if (isCorrect) {
      setRandomWord(selectedWordList)
      setUserInput('')
      setScore(score+1)
      setStep(3);
    } else {
      setStep(5);
      saveScore()
      setScore(0)
    }
  };

  const saveScore = () => {
    console.log("score saving", score)
    scoreApi.saveScore({
      userId: userInfo.id,
      gameId: 'messyLetters',
      score: score,
      time: null
    })    
  }
  
  const handleVerify = () => {
    const isInputCorrect = userInput.toLowerCase() === correctWord.toLowerCase();
    setIsCorrect(isInputCorrect);
    setStep(4);
  };

  const handleGameDataSelection = (data) => {
    const selectedWordList = gameData.find((gData) => gData.listName === data.listName).wordList
    setSelectedWordList(selectedWordList)
    setRandomWord(selectedWordList)
  }

  const getRandomWord = (selectedWordList) => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * selectedWordList.length);
    } while (selectedWordList[randomIndex]===previousWord)
    setPreviousWord(selectedWordList[randomIndex])
    return selectedWordList[randomIndex];
  };

  const setRandomWord = (selectedWordList) => {
    const newWord = getRandomWord(selectedWordList);
    setCorrectWord(newWord)
    setCurrentWord(shuffleWord(newWord));
    setStep(3);
  }

  const shuffleWord = (word) => {
    let shuffledWord
    do {
      shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    } while (shuffledWord===word) // Prevent unshuffled word
    return shuffledWord;
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
                <button onClick={()=>setStep(2)} style={{ marginTop: '1em' }}>
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
                  {isCorrect ? <span style={{color: 'green'}}>¡Correcto!</span> : (
                    <>
                      <span style={{color: 'red'}}>Incorrecto.</span> <br />
                      La palabra correcta es: <span style={{textDecoration: 'underline'}}>{correctWord}</span>
                    </>
                  )}
                </p>
                <button onClick={handleNextOrResults} style={{ marginTop: '1em' }}>
                  {isCorrect ? 'Siguiente Palabra' : 'Resultados'}
                </button>
              </>
            )}
            {step === 5 && (
              <>
                <p>Tu puntuación: {score}</p>
                <button onClick={()=>setStep(1)} style={{ margin: '1em 0' }}>
                  Terminar
                </button>
                <ResultView gameName={'messyLetters'} score={score} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};