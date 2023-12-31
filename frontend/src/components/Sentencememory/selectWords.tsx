
import React, { useState } from 'react';

import { GameApi } from '../../api/backApi';

export const SelectWords = ({ setSettings, sentenceToSave, setSaveNewSentence }) => {
  const [selectedWords, setSelectedWords] = useState([]);

  const gameApi = new GameApi();

  const toggleSelectedWord = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
    console.log("selectedWords", selectedWords)
  };

  const isWordSelected = (word) => selectedWords.includes(word);

  const saveNewData = () => {
    gameApi.saveGameData({ name: 'sentenceMemory', selectedWords, sentenceToSave }).then((res) => {
      console.log("res", res)
      // TODO Hacer algo después de guardar los datos, si es necesario
    });
    setSettings(0)
    setSaveNewSentence(false)
  };

  return (
    <div className="main-container">
      <div className="challenge">
        <h2>NUEVA ORACIÓN</h2>
        <p>Selecciona las palabras que deseas resaltar:</p>
        <button onClick={saveNewData}>Guardar</button>
      </div>
      <p className="sentence-preview">
        {sentenceToSave.map((word, index) => (
          <span
            key={index}
            className={isWordSelected(word) ? 'selected-word' : ''}
            onClick={() => toggleSelectedWord(word)}
            style={{ marginRight: '10px' }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};
