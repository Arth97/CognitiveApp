import './SentenceMemory.css';
import React, { useState } from 'react';

import { InputSentence } from '../components/Sentencememory/inputSentence';

export const SentenceMemory = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const [saveNewSentence, setSaveNewSentence] = useState(false);

  const [words, setWords] = useState({
    word1: '',
    word2: '',
    word3: '',
    word4: '',
    word5: '',
    word6: '',
  });

  const originalSentence = "El sol brilla en un cielo azul y despejado. Las aves vuelan y cantan mientras los árboles se mecen con la brisa.";

  const missingSentence = `El sol brilla en un [${words.word1}] azul y [${words.word2}]. Las aves [${words.word3}] y [${words.word4}] mientras los [${words.word5}] se [${words.word6}] con la [___].`;

  const startChallenge = () => {
    if (level === 1) {
      setLevel(2);
    } else if (level === 2) {
      checkAnswers();
      setLevel(3);
    } else if (level === 3) {
      resetChallenge();
      setLevel(1);
    }
  };

  const checkAnswers = () => {
    if (
      words.word1.toLowerCase() === "cielo" &&
      words.word2.toLowerCase() === "despejado" &&
      words.word3.toLowerCase() === "vuelan" &&
      words.word4.toLowerCase() === "cantan" &&
      words.word5.toLowerCase() === "árboles" &&
      words.word6.toLowerCase() === "brisa"
    ) {
      setScore(score + 1);
    }
  };

  const resetChallenge = () => {
    setScore(0);
    setWords({
      word1: '',
      word2: '',
      word3: '',
      word4: '',
      word5: '',
      word6: '',
    });
    //style={{position: 'fixed', top: '20px', right: '20px', z-index: '1000'}}
  };

  return (
    <div className="main-container">
      {saveNewSentence && (
        <InputSentence />
      )}
      {!saveNewSentence && (
        <>      
          <button onClick={() => setSaveNewSentence(true)} style={{position: 'fixed', top: '20px', right: '20px', zIndex: '1000'}}>Guardar nueva oración</button>
          <div className="challenge">
            <h2>Nivel {level}: Memorización</h2>
            <p>Oración Inicial:</p>
            <p>{originalSentence}</p>
            <button onClick={startChallenge}>
              {level === 1 ? "Siguiente" : level === 2 ? "Verificar" : "Reiniciar"}
            </button>
          </div>

          {level === 2 && (
            <div className="challenge">
              <h2>Nivel 2: Completa la Oración</h2>
              <p>Completa la siguiente oración:</p>
              <p>{missingSentence}</p>
              <input
                type="text"
                placeholder="Palabra 1"
                value={words.word1}
                onChange={(e) => setWords({ ...words, word1: e.target.value })}
              />
              <input
                type="text"
                placeholder="Palabra 2"
                value={words.word2}
                onChange={(e) => setWords({ ...words, word2: e.target.value })}
              />
              <input
                type="text"
                placeholder="Palabra 3"
                value={words.word3}
                onChange={(e) => setWords({ ...words, word3: e.target.value })}
              />
              <input
                type="text"
                placeholder="Palabra 4"
                value={words.word4}
                onChange={(e) => setWords({ ...words, word4: e.target.value })}
              />
              <input
                type="text"
                placeholder="Palabra 5"
                value={words.word5}
                onChange={(e) => setWords({ ...words, word5: e.target.value })}
              />
              <input
                type="text"
                placeholder="Palabra 6"
                value={words.word6}
                onChange={(e) => setWords({ ...words, word6: e.target.value })}
              />
              <button onClick={startChallenge}>Siguiente</button>
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

