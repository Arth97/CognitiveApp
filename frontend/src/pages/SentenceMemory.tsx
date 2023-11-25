/* eslint-disable react-hooks/exhaustive-deps */
import './SentenceMemory.css';
import React, { useEffect, useState } from 'react';

import { InputSentence } from '../components/SentenceMemory/inputSentence';
import { SelectWords } from '../components/SentenceMemory/selectWords';

import { GameApi } from '../api/backApi';

export const SentenceMemory = () => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [allSentences, setAllSentences] = useState([]);
  const [selectedSentenceIds, setSelectedSentenceIds] = useState([]);

  const [currentSentence, setCurrentSentence] = useState("");
  const [userInputSentence, setUserInputSentence] = useState([]);
  const [selectedHiddenWords, setSelectedHiddenWords] = useState([]);

  const [saveNewSentence, setSaveNewSentence] = useState(false);
  const [sentenceToSave, setSentenceToSave] = useState([])

  const gameApi = new GameApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sentences = await gameApi.getGameDataByname('SentenceMemory');
        setAllSentences(sentences.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])

  const selectAndSetSentence = () => {
    const availableSentences = allSentences.filter(sentence => !selectedSentenceIds.includes(sentence._id))
    const selectedSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)]
    setSelectedSentenceIds(prevIds => [...prevIds, selectedSentence._id]);
    setCurrentSentence(selectedSentence.sentenceToSave.join(" "))

    if (selectedSentence.selectedWords.length>3)
      setRandomHiddenWords(selectedSentence)
    else setSelectedHiddenWords(selectedSentence.selectedWords)
  }

  const startChallenge = async () => {
    selectAndSetSentence()
    setGameStarted(true)
    setLevel(1)
    return; 
  };
  
  const setRandomHiddenWords = (selectedSentence) => {
    const randomWords = [];
    let hiddenWordCount = 0;
    let wordsCopy = selectedSentence.selectedWords.slice();
    // hiddenWordCount = Math.min(Math.floor(Math.random() * (wordsCopy.length - 3)) + 4, wordsCopy.length);
    hiddenWordCount = 4
    for (let i = 0; i < hiddenWordCount; i++) {
      const randomIndex = Math.floor(Math.random() * wordsCopy.length);
      randomWords.push(wordsCopy[randomIndex]);
      wordsCopy.splice(randomIndex, 1);
    }
    setSelectedHiddenWords(randomWords)
  };

  const nextStep = () => {
    let correctAnswer;
    if (level === 1) {
      setLevel(2);
      let auxSentence = currentSentence.split(' ');
      auxSentence = auxSentence.map(word => selectedHiddenWords.includes(word) ? '___' : word)
      setUserInputSentence(auxSentence)
      console.log("hiddenWords", selectedHiddenWords)
    } else if (level === 2) {
      setLevel(3)
    } else if (level === 3) {
      correctAnswer = checkAnswers();
      if (correctAnswer)
        setLevel(1)
      else
        setLevel(4);
      selectAndSetSentence()
    } else if (level === 4) {
      setLevel(1);
      setScore(0);
      // TODO: Programar el chart de puntuaciones
    }
  }

  const checkAnswers = () => {
    const areWordsCorrect = userInputSentence.every((word, index) => word === currentSentence.split(' ')[index]);
    if (areWordsCorrect) {
      console.log("Deee lujooooooo");
      setScore(score + 1);
      return true;
    } else {
      console.log("Mierda");
      const incorrectWords = userInputSentence.filter((word, index) => word !== currentSentence.split(' ')[index]);
      console.log(`Las palabras incorrectas son: ${incorrectWords.join(', ')}`);
      return false;
    }
  };

  const getInputType = (word, index) => {
    if (!selectedHiddenWords.includes(word)) return <span key={index}>{word} </span>;
    if (level===2) {
      return (
        <span key={index}>
          <input
            type="text"
            placeholder={``}
            onChange={(e) => {
              const updatedSentence = userInputSentence;
              updatedSentence[index] = e.target.value;
              setUserInputSentence(updatedSentence)
            }}
          />{' '}
        </span>
      )
    } else if (level===3) {
      return (
        <span key={index}>
          <input
            type="text"
            placeholder={userInputSentence[index]==='___' ? '' : (userInputSentence[index] || '')}
            className={userInputSentence[index] === currentSentence.split(' ')[index] ? 'correct' : 'incorrect'}
            readOnly={true}
          />{' '}
        </span>
      )
    }
  }

  return (
    <div className="main-container">
      {!gameStarted && !saveNewSentence && (
        <>      
          <button onClick={() => null} style={{position: 'fixed', top: '20px', left: '20px', zIndex: '1000'}}>Volver al menú</button>
          <button onClick={() => setSaveNewSentence(true)} style={{position: 'fixed', top: '20px', right: '20px', zIndex: '1000'}}>Guardar nueva oración</button>
          <div className="challenge">
            <h2>MEMORIZACIÓN</h2>
            <p>Recuerda la oración e indica las palabras que faltan</p>
            <button onClick={startChallenge}>
              Comenzar
            </button>
          </div>
        </>
      )}
      {saveNewSentence && (settings===1) && (
        <InputSentence setSettings={setSettings} setSentenceToSave={setSentenceToSave} />
      )}
      {saveNewSentence && (settings===2) && (
        <SelectWords setSettings={setSettings} sentenceToSave={sentenceToSave} setSaveNewSentence={setSaveNewSentence} />
      )}
      {!saveNewSentence && gameStarted && (
        <>
          {level === 1 && (
            <>
              <button onClick={() => setSaveNewSentence(true)} style={{position: 'fixed', top: '20px', right: '20px', zIndex: '1000'}}>
                Guardar nueva oración
              </button>
              <div className="challenge">
                <h2>MEMORIZACIÓN</h2>
                <p>Oración Inicial:</p>
                <p>{currentSentence}</p>
                <div style={{display: 'flex', marginTop: '1em' }}>                  
                  <button onClick={startChallenge && nextStep}>Siguiente</button>
                  <p style={{marginLeft: '1em'}}>{score} puntos</p>
                </div>
              </div>
            </>
          )}

          {(level === 2 || level === 3) && (
            <div className="challenge">
              <h2>COMPLETE LA ORACIÓN</h2>
              <p>Completa la siguiente oración:</p>
              <div>
                {currentSentence.split(' ').map((word, index) => {
                  return (
                    getInputType(word, index)
                  );                  
                })}
              </div>
              <div style={{display: 'flex', marginTop: '1em' }}>                  
                <button onClick={nextStep}> {level===2 ? 'Verificar' : 'Siguiente'} </button>
                <p style={{marginLeft: '1em'}}>{score} puntos</p>
              </div>
            </div>
          )}

          {level === 4 && (
            <div className="challenge">
              <h2>RESULTADOS</h2>
              <p>Tu puntuación: {score}</p>
              <button style={{marginTop: '1em'}} onClick={nextStep}>Reiniciar</button>
            </div>
          )}
        </>
      )}

    </div>
  );
}

