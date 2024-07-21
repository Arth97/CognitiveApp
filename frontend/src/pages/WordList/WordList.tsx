// WordList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameApi, ScoreApi } from '../../api/backApi';
import { useUserInfoStore } from '../../state/userState';
import { ResultView } from '../../components/resultComponent';
import { InputWordList } from '../../components/inputWordList';

const initialWordList = [
  'Palabra1', 'Palabra2', 'Palabra3', 'Palabra4', 'Palabra5',
  'Palabra6', 'Palabra7', 'Palabra8', 'Palabra9', 'Palabra10'
];

export const WordList = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [wordList, setWordList] = useState(initialWordList);
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [allWordsCorrect, setAllWordsCorrect] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [currentPercentageIndex, setCurrentPercentageIndex] = useState(15);
  const [selectedData, setSelectedData] = useState([]);

  const { userInfo } = useUserInfoStore();

  const navigate = useNavigate();
  const gameApi = new GameApi();
  const scoreApi = new ScoreApi();

  useEffect(() => {
    console.log("userInfo", userInfo)
    const retriveData = async () => {
      const data = await gameApi.getGameDataByName('wordList')
      setGameData(data.data); // TODO: Modificar el back para no tener tanto data.data anidado en el objeto de respuesta
    }
    retriveData();
  },[])

  const handleStart = () => {
    setCurrentPercentageIndex(15)
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
    else if (step===4) handleVerify()
    else if (step === 5) {
      if(allWordsCorrect) {
        if (currentPercentageIndex===100) {
          saveScore();
          setStep(6)
          // TODO: Algo que señalice que se ha completado
        } else {
          setCurrentPercentageIndex(currentPercentageIndex+5)      
          handleGameDataSelection(selectedData)
        }
      } else {
        saveScore();
        setStep(6);
      }
    }
    else if (step===6) { setStep(1); setGameStarted(false) }
    else setStep(step + 1);
  };

  const handleVerify = () => {
    const newScore = userInput.filter((input, index) => input.toLowerCase() === wordList[index].toLowerCase()).length;
    setScore(score + newScore);
    setStep(step + 1);
    setAllWordsCorrect(userInput.every((input, index) => input.toLowerCase() === wordList[index].toLowerCase()))    
  };

  const saveScore = () => {
    console.log("score saving", score)
    scoreApi.saveScore({
      userId: userInfo.id,
      gameId: 'wordList',
      score: score,
      time: null
    })    
  }

  const handleGameDataSelection = (data) => {
    setSelectedData(data)
    const selectedWordList = gameData.find((gData) => gData.listName === data.listName).wordList
    const shuffledWordList = shuffleArray(selectedWordList);

    const selectedWordCount = Math.ceil((currentPercentageIndex / 100) * selectedWordList.length);
    console.log("selectedWordCount", selectedWordCount)
    const selectedShuffledWordList = shuffledWordList.slice(0, selectedWordCount)
    setWordList(selectedShuffledWordList);
    setUserInput(Array(selectedShuffledWordList.length).fill(''))
    setStep(3);
  }

  function shuffleArray(array) {
    let currentIndex = array.length
    let randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const renderWordInput = (index) => {
    if (step === 4) {
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
    } else if (step === 5) {
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
        <InputWordList gameName={'wordList'} />
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
            {(step === 4 || step === 5) && (
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
                  {step===4 ? 'Verificar' : 'Siguiente Nivel'}
                </button>
              </>
            )}
            {step === 6 && (
              <>
                <p>Tu puntuación: {score}</p>
                <button onClick={handleNext} style={{ margin: '1em 0' }}>
                  Terminar
                </button>
                <ResultView gameName={'wordList'} score={score} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

