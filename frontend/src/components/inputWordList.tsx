// import './MessyLetters.css';
import React, { useEffect, useRef, useState } from 'react';
import { GameApi } from '../api/backApi';

export const InputWordList = ({gameName}) => {
  const [listName, settListName] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [wordList, setWordList] = useState([]);
  const inputListRef = useRef(null);
  const inputWordRef = useRef(null);

  const gameApi = new GameApi();

  const handleInputNameListChange = (e) => {
    settListName(e.target.value);
  };
  
  const handleInputWordChange = (e) => {
    setInputWord(e.target.value);
  };

  // const handleAddListName = () => {
  //   if (inputWord.trim() !== '') {
  //     setWordList([...wordList, inputWord]);
  //     setInputWord('');
  //   }
  // };

  const handleAddWord = () => {
    if (inputWord.trim() !== '') {
      setWordList([...wordList, inputWord]);
      setInputWord('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (document.activeElement === inputListRef.current) {
        // handleAddListName();
      } else if (document.activeElement === inputWordRef.current) {        
        handleAddWord();
      }
    }
  };

  const saveListOfWord = () => {
    console.log("gameName", gameName)
    gameApi.saveGameData({ gameName, listName, wordList }).then((res) => {
      console.log("res", res)
      // TODO Hacer algo después de guardar los datos, si es necesario
    });
  };

  return (
    <div className="main-container" style={{justifyContent: 'center'}}>
      <div className="challenge">
        <h2>NUEVAS PALABRAS</h2>
        <p>Introduce el nombre del conjunto de palabras:</p>
        <div style={{display: 'flex'}}>
          <input
            ref={inputListRef}
            type="text"
            placeholder="Nombre de la lista"
            value={listName}
            onChange={handleInputNameListChange}
            onKeyPress={handleKeyPress}
            style={{ marginRight: '10px', width: '150px' }}
          />
          <p style={{ marginTop: '0.3rem' }}>{listName}</p>
        </div>
        <p>Introduce una nueva palabra:</p>
        <input
          ref={inputWordRef}
          type="text"
          placeholder="Palabra"
          value={inputWord}
          onChange={handleInputWordChange}
          onKeyPress={handleKeyPress}
          style={{ marginRight: '10px', width: '150px' }}
        />
        <div style={{display: 'flex'}}>
          <h3>Lista de Palabras</h3>
          <button onClick={saveListOfWord} style={{marginLeft: '24px'}} >Terminar</button>
        </div>
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