import React, { useState } from 'react';
import './App.css';
import { Login, Register, Home, NumberMemory, WordMemory, LetterMix, QuickReflex } from './pages';
import { Routes, Route } from 'react-router-dom';
import { UserInfoContextProvider } from './context/userInfoContext';

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
        </Routes>
      </UserInfoContextProvider>
    </div>
  );
}

export default App;
