import React, { useState } from 'react';
import './App.css';
import { Login, Register, Home, NumberMemory, WordMemory, LetterMix, QuickReflex, SentenceMemory, WordList, MessyLetters, ChainedWords, SquareMemory } from './pages';
import { Routes, Route } from 'react-router-dom';
import { UserInfoContextProvider } from './context/userInfoContext';
import { StroopEffect } from './pages/StroopEffect';

function App() {
  
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <UserInfoContextProvider>
        <Routes>
          <Route path="/" element={          
            currentForm === "login" 
              ? <Login onFormSwitch={toggleForm} /> 
              : <Register onFormSwitch={toggleForm} />          
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/number-memory" element={<NumberMemory />} />
          <Route path="/word-memory" element={<WordMemory />} />
          <Route path="/letter-mix" element={<LetterMix />} />
          <Route path="/quick-reflex" element={<QuickReflex />} />
          <Route path="/sentence-memory" element={<SentenceMemory />} />
          <Route path="/word-list" element={<WordList />} />
          <Route path="/messy-letters" element={<MessyLetters />} />
          <Route path="/chained-words" element={<ChainedWords />} />
        </Routes>
      </UserInfoContextProvider>
    </div>
  );
}

export default App;
