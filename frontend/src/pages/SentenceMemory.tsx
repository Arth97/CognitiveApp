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

  const [selectedSentenceIds, setSelectedSentenceIds] = useState([]);
  const [currentSentence, setcurrentSentence] = useState("");
  const [userInputSentence, setUserInputSentence] = useState([]);
  const [missingSentence, setMissingSentence] = useState("");
  const [hiddenWords, setHiddenWords] = useState([]);
  const [selectedHiddenWords, setSelectedHiddenWords] = useState([]);

  const [saveNewSentence, setSaveNewSentence] = useState(false);
  const [sentenceToSave, setSentenceToSave] = useState([])

  const gameApi = new GameApi();

  const startChallenge = async () => {
    if (!gameStarted) {
      const allSentences = await gameApi.getGameDataByname('SentenceMemory');
      // console.log("Sentences", allSentences)
      
      const availableSentences = allSentences.data.filter(sentence => !selectedSentenceIds.includes(sentence._id))
      const selectedSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)]      
      console.log("Selected Sentence", selectedSentence)
      setSelectedSentenceIds(prevIds => [...prevIds, selectedSentence._id]);         
      setcurrentSentence(selectedSentence.sentenceToSave.join(" "))

      if (selectedSentence.selectedWords.length>3)
        setRandomHiddenWords(selectedSentence)
      else setSelectedHiddenWords(selectedSentence.selectedWords)

      console.log("currentSentencePre", currentSentence)
      //setMissingSentence(createMissingSentence(currentSentence, selectedHiddenWords));

      setGameStarted(true)
      setLevel(1)
      console.log("currentSentence", currentSentence)
      return;
    }
    if (level === 1) {
      setLevel(2);
      setUserInputSentence(currentSentence.split(' '))
    } else if (level === 2) {
      checkAnswers();
      setLevel(3);
    } else if (level === 3) {
      resetChallenge();
      setLevel(1);
    }
  };

  useEffect(() => {
    // Llama a la función para crear la oración faltante y actualiza el estado
    if (currentSentence && selectedHiddenWords.length > 0) {
      // setMissingSentence(createMissingSentence(currentSentence, selectedHiddenWords));
    }
  }, [currentSentence, selectedHiddenWords]); // Activa el efecto cuando estas variables cambian


  const createMissingSentence = (currentSentence, hiddenWords) => {
    console.log("currentSentence", currentSentence)
    // Partimos la oración actual por los espacios en blanco para tener cada palabra
    const words = currentSentence.split(' ');
  
    // Iteramos por cada palabra en la oración actual
    const missingSentence = words.map((word) => {
      // console.log("word", word)
      // Si la palabra está en la lista de palabras ocultas, la reemplazamos con espacios en blanco
      if (hiddenWords.includes(word)) {
        return '___'; // Espacio en blanco para ocultar la palabra
      } else {
        return word; // Mantenemos la palabra original
      }
    });
  
    // Juntamos las palabras para formar la oración
    // console.log("missingSentence", missingSentence)
    return missingSentence.join(' ');
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
    console.log("randomWords", randomWords);
  };

  const checkAnswers = () => {
    console.log("userInputSentence", userInputSentence);
    console.log("currentSentence", currentSentence.split(' '));
  
    // Compara todas las palabras
    const areWordsCorrect = userInputSentence.every((word, index) => word === currentSentence.split(' ')[index]);
  
    if (areWordsCorrect) {
      console.log("Deee lujooooooo");
      setScore(score + 1);
    } else {
      console.log("Mierda");
      
      // Encuentra e indica las palabras incorrectas
      console.log("userInputSentence", userInputSentence)
      console.log("currentSentence", currentSentence)
      const incorrectWords = userInputSentence.filter((word, index) => word !== currentSentence.split(' ')[index]);
      console.log("incorrectWords", incorrectWords)
      console.log(`Las palabras incorrectas son: ${incorrectWords.join(', ')}`);
    }
  };

  const resetChallenge = () => {
    setScore(0);
    //style={{position: 'fixed', top: '20px', right: '20px', z-index: '1000'}}
  };

  return (
    <div className="main-container">
      {!gameStarted && !saveNewSentence && (
        <>      
          <button onClick={() => setSaveNewSentence(true)} style={{position: 'fixed', top: '20px', right: '20px', zIndex: '1000'}}>Guardar nueva oración</button>
          <div className="challenge">
            <h2>Memorización</h2>
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
              <button onClick={() => setSaveNewSentence(true)} style={{position: 'fixed', top: '20px', right: '20px', zIndex: '1000'}}>Guardar nueva oración</button>
              <div className="challenge">
                <h2>Nivel {level}: Memorización</h2>
                <p>Oración Inicial:</p>
                <p>{currentSentence}</p>
                <button onClick={startChallenge}>Siguiente</button>
              </div>
            </>
          )}

          {level === 2 && (
            <div className="challenge">
              <h2>Nivel 2: Completa la Oración</h2>
              <p>Completa la siguiente oración:</p>
              <div>
                {currentSentence.split(' ').map((word, index) => {
                  if (selectedHiddenWords.includes(word)) {
                    return (
                      <span key={index}>
                        <input
                          type="text"
                          placeholder={``}
                          onChange={(e) => {
                            const updatedSentence = userInputSentence;
                            updatedSentence[index] = e.target.value;
                            setUserInputSentence(updatedSentence)
                            // const newMissingSentence = updatedSentence.join(' ');
                            //setMissingSentence(newMissingSentence);
                          }}
                        />{' '}
                      </span>
                    );
                  } else {
                    return <span key={index}>{word} </span>;
                  }
                })}
              </div>
              <button onClick={startChallenge}>Verificar</button>
            </div>
          )}

          {level === 3 && (
            <div className="challenge">
              <h2>Nivel 3: Resultados</h2>
              <p>Tu puntuación: {score}</p>
              <button onClick={resetChallenge}>Reiniciar</button>
            </div>
          )}
        </>
      )}

    </div>
  );
}

