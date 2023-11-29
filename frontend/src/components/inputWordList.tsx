// import './MessyLetters.css';
import React, { useState } from 'react';
import { GameApi } from '../api/backApi';

export const InputWordList = ({gameName}) => {
  const [inputWord, setInputWord] = useState('');
  const [wordList, setWordList] = useState([]);

  const gameApi = new GameApi();

  const handleInputChange = (e) => {
    setInputWord(e.target.value);
  };

  const handleAddWord = () => {
    if (inputWord.trim() !== '') {
      setWordList([...wordList, inputWord]);
      setInputWord('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  const saveListOfWord = () => {
    console.log("gameName", gameName)
    gameApi.saveGameData({ name: gameName, wordList }).then((res) => {
      console.log("res", res)
      // TODO Hacer algo después de guardar los datos, si es necesario
    });
  };

  return (
    <div className="main-container" style={{justifyContent: 'center'}}>
      <div className="challenge">
        <h2>NUEVAS PALABRAS</h2>
        <p>Introduce una nueva palabra:</p>
        <input
          type="text"
          placeholder="Palabra"
          value={inputWord}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ marginRight: '10px' }}
        />
        <button onClick={saveListOfWord}>Terminar</button>
        <h3>Lista de Palabras</h3>
        <div className="word-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <ul>
            {wordList.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};