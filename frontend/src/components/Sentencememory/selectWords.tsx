
import React, { useState } from 'react';

import { GameApi } from '../../api/backApi';

export const SelectWords = ({ sentenceToSave }) => {
  const [selectedWords, setSelectedWords] = useState([]);

  const gameApi = new GameApi();

  const toggleSelectedWord = (word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const isWordSelected = (word) => selectedWords.includes(word);

  const saveNewData = () => {
    gameApi.saveChallenge({ selectedWords, sentenceToSave }).then(() => {
      // TODO Hacer algo después de guardar los datos, si es necesario
    });
  };
  

  return (
    <div className="main-container">
      <div className="challenge">
        <h2>NUEVA ORACIÓN</h2>
        <p>Selecciona las palabras que deseas resaltar:</p>
        <button onClick={null}>Guardar</button>
      </div>
      <p className="sentence-preview">
        {sentenceToSave.map((word, index) => (
          <span
            key={index}
            className={isWordSelected(word) ? 'selected-word' : ''}
            onClick={() => toggleSelectedWord(saveNewData)}
            style={{ marginRight: '10px' }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};
