import '../styles/Home.css';
import '../styles/Main.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = (props) => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h2>CognitiveApp</h2>
      <div className="home-menu-grid">
        <button onClick={() => navigate('/number-memory')} className="main-btn">Number memory</button>
        <button onClick={() => navigate('/word-memory')} className="main-btn">Word Memory</button>
        <button onClick={() => navigate('/letter-mix')} className="main-btn">LetterMix</button>
        <button onClick={() => navigate('/quick-reflex')} className="main-btn">QuickReflex</button>
        <button onClick={() => navigate('/sentence-memory')} className="main-btn">SentenceMemory</button>
        <button onClick={() => navigate('/word-list')} className="main-btn">Word List</button>
        <button onClick={() => navigate('/messy-letters')} className="main-btn">Messy Letters</button>
        <button className="main-btn">Button</button>
        <button className="main-btn">Button</button>
        <button onClick={() => navigate('/chained-words')} className="main-btn">Chained Words</button>
        <button onClick={() => navigate('/stroop-effect')} className="main-btn">Stroop Effect</button>
      </div>
      <div>
        <button className="main-btn">Salir</button>
      </div>
    </div>
  );
};
