// import './SentenceMemory.css';
import React, { useState } from 'react';

export const InputSentence = () => {
  const [sentenceToSave, setSentenceToSave] = useState("")
  const [sentenceToArray, setSentenceToArray] = useState([])

  const parseSentence = () => {
    let sentence = sentenceToSave.split(" ")
    setSentenceToArray(sentence)
    console.log("sentenceToArray", sentenceToArray)
  }

  return (
    <div className="main-container">
      <div className="challenge">
        <h2>NUEVA ORACIÓN</h2>
        <p>Inroduce la nueva oración: </p>        
        <input
          type="text"
          placeholder="Oración"
          value={sentenceToSave}
          onChange={(e) => setSentenceToSave(e.target.value)}
          style={{marginRight: '10px'}}
        />
        <button onClick={parseSentence}>
          Siguiente
        </button>
      </div>
      <p className="sentence-preview">{sentenceToSave}</p>
    </div>
  );
}



/*

export const InputSentence = () => {
  const [sentenceToSave, setSentenceToSave] = useState('');
  const [sentenceToArray, setSentenceToArray] = useState([]);
  const [hiddenWords, setHiddenWords] = useState([]);

  const parseSentence = () => {
    const sentence = sentenceToSave.split(' ');
    setSentenceToArray(sentence);
    setHiddenWords([]);
  };

  const toggleHiddenWord = (word) => {
    if (hiddenWords.includes(word)) {
      setHiddenWords(hiddenWords.filter((w) => w !== word));
    } else {
      setHiddenWords([...hiddenWords, word]);
    }
  };

  const isWordHidden = (word) => hiddenWords.includes(word);

  return (
    <div className="main-container">
      <div className="challenge">
        <h2>NUEVA ORACIÓN</h2>
        <p>Introduce la nueva oración:</p>
        <input
          type="text"
          placeholder="Oración"
          value={sentenceToSave}
          onChange={(e) => setSentenceToSave(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={parseSentence}>Siguiente</button>
      </div>
      <p className="sentence-preview">
        {sentenceToArray.map((word, index) => (
          <span
            key={index}
            className={isWordHidden(word) ? 'hidden-word' : ''}
            onClick={() => toggleHiddenWord(word)}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

*/