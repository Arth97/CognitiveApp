// WordMemory.tsx
import { useState, useEffect, useContext } from 'react';

// import { ScoreApi } from '../api/backApi';
// import UserInfoContext from '../context/userInfoContext';

// import { useUserInfoStore } from '../state/userState';
import { useNavigate } from 'react-router-dom';
import { InputWordList } from '../components/inputWordList';
import { ResultView } from '../components/resultComponent';

// var words = require('an-array-of-english-words')

export const WordMemory = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [points, setPoints] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [previousWord, setPreviousWord] = useState('');
  const [lastTenWords, setLastTenWords] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // const {userInfo} = useContext(UserInfoContext)
  // const { userInfo } = useUserInfoStore();

  const navigate = useNavigate();
  // const scoreApi = new ScoreApi();

  useEffect(() => {
    if (remainingAttempts === 0) {
      setIsGameOver(true);
    } else {
      getNewWord();
    }
  }, [remainingAttempts]);


  const handleKnownWord = () => {
    if (usedWords.includes(currentWord)) {
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
      usedWords.push(currentWord)
      setUsedWords(usedWords)
    }
    getNewWord();
  };

  const handleNewWord = () => {
    if (usedWords.includes(currentWord)) {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
    } else {
      setPoints((prevPoints) => prevPoints + 1);
      usedWords.push(currentWord)
      setUsedWords(usedWords)
    }
    getNewWord();
  };

  const getNewWord = () => {
    // Ampliar logica para usar palabra aleatoria
    // Simplificado para test
    const words = ['apple', 'banana', 'orange', 'grape', 'pear'];
    let randomIndex = Math.floor(Math.random() * words.length);
    let newWord = words[randomIndex];
    while(newWord === previousWord) {
      randomIndex = Math.floor(Math.random() * words.length);
      newWord = words[randomIndex];
    }
    setPreviousWord(newWord)
    setCurrentWord(newWord);
  };

  const handleGameEnd = () => {
    // Reseteamos los estados para empezar una nueva partida
    setRemainingAttempts(3);
    setPoints(0);
    setUsedWords([]);
    setCurrentWord('');
    setIsGameOver(false);
  };

  return (
    <div className="main-container">
      {saveNewData && (
        <InputWordList gameName={'wordMemory'} />
      )}
      {!saveNewData && (
        <div>
          <button onClick={() => navigate('/home')} className="top-button-left"> Volver al menú </button>
          <button onClick={() => setSaveNewData(true)} className="top-button-right"> Guardar nuevos datos </button>
          <div className="main-container" style={{minHeight: '100vh'}}>
            <div className="inside-container">
              {!isGameOver ? (
                <>
                  <div>
                    <p>Intentos restantes: {remainingAttempts}</p>
                    <p>Puntos: {points}</p>
                  </div>
                  <h2 style={{marginLeft: '2.75em'}}>{currentWord}</h2>
                  <div style={{marginTop: '1em'}}>
                    <button style={{marginRight: '0.5em'}} onClick={handleKnownWord}>Palabra Conocida</button>
                    <button style={{marginLeft: '0.5em'}} onClick={handleNewWord}>Palabra Nueva</button>
                  </div>
                </>
              ) : (
                <>
                  <h2>RESULTADOS</h2>
                  <p>Tu puntuación: {points}</p>
                  <button onClick={handleGameEnd}>Empezar de nuevo</button>
                  <ResultView gameName={'wordMemory'}/>
                </>
              )}
            </div>
          </div>
        </div>
        )}
    </div>
  );
};
