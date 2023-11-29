// WordMemory.tsx
import { useState, useEffect, useContext } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

import { CHART_COLORS, transparentize } from '../utils/chartUtils'
import { ScoreApi } from '../api/backApi';
import UserInfoContext from '../context/userInfoContext';

import { chartBackgroundColor } from '../plugins/chartJsPlugins';
import { useUserInfoStore } from '../state/userState';
import { useNavigate } from 'react-router-dom';
import { InputWordList } from '../components/inputWordList';

// var words = require('an-array-of-english-words')

export const WordMemory = () => {
  const [saveNewData, setSaveNewData] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [points, setPoints] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [previousWord, setPreviousWord] = useState('');
  const [lastTenWords, setLastTenWords] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);
  const [userScores, setUserScores] = useState(null);
  const [totalScores, setTotalScores] = useState(null);

  // const {userInfo} = useContext(UserInfoContext)
  const { userInfo } = useUserInfoStore();

  const navigate = useNavigate();
  const scoreApi = new ScoreApi();

  // EndGame
  useEffect(() => {
    if (!isGameOver) return;

    console.log("Init")
    console.log("chartInstance", chartInstance)

    // Save info result BBDD
    scoreApi.saveScore({
      userId: userInfo.id,
      gameId: 'wordMemory',
      score: points,
      time: null
    });

    userScores[points]++;
    totalScores[points]++;

    if (chartInstance) {
      chartInstance.destroy();
    }

    const labels = Array.from({ length: 40 }, (_, index) => index);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Puntuacion del usuario',
          data: userScores,
          borderColor: CHART_COLORS.blue,
          backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
          fill: 'origin', 
        },
        {
          label: 'Puntuacion global',
          data: totalScores,
          borderColor: CHART_COLORS.yellow,
          backgroundColor: transparentize(CHART_COLORS.yellow, 0.5),
          fill: '-1', 
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: 'black',
            },
            title: {
              display: true,
              text: 'Puntuación'
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              color: 'black',
            },
            title: {
              display: true,
              text: 'Nº de veces'
            }
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
      plugins: [chartBackgroundColor],
    };
  
    const chartElem = document.getElementById('chartJs') as HTMLCanvasElement;
    const newChartInstance: Chart = new Chart(
      chartElem,
      config
    );

    setChartInstance(newChartInstance);

  }, [isGameOver]);

  useEffect(() => {
    scoreApi.getUserScores({ userId: userInfo.id, gameId: 'wordMemory' }).then((data) => {
      setUserScores(data)
    })
    .catch(() => {
      // Todo
    })
  
    scoreApi.getTotalScores({ userId: userInfo.id, gameId: 'wordMemory' }).then((data) => {
      setTotalScores(data)
    })
    .catch(() => {
      // Todo
    })
  }, []);

  useEffect(() => {
    if (remainingAttempts === 0) {
      setIsGameOver(true);
    } else {
      getNewWord();
    }
  }, [remainingAttempts]);


  const handleKnownWord = () => {
    // Si el usuario selecciona palabra conocida, sumamos un punto
    if (usedWords.includes(currentWord)) {
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
      usedWords.push(currentWord)
      setUsedWords(usedWords)
    }
    // Obtenemos una nueva palabra aleatoria
    getNewWord();
  };

  const handleNewWord = () => {
    // Si el usuario selecciona palabra nueva, restamos un intento
    if (usedWords.includes(currentWord)) {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
    } else {
      setPoints((prevPoints) => prevPoints + 1);
      usedWords.push(currentWord)
      setUsedWords(usedWords)
    }
    // Obtenemos una nueva palabra aleatoria
    getNewWord();
  };

  const getNewWord = () => {
    // Aquí podrías implementar la lógica para obtener una palabra aleatoria
    // Por simplicidad, aquí usaré una lista fija de palabras
    const words = ['apple', 'banana', 'orange', 'grape', 'pear'];
    let randomIndex = Math.floor(Math.random() * words.length);
    let newWord = words[randomIndex];
    while(newWord === previousWord) {
      randomIndex = Math.floor(Math.random() * words.length);
      newWord = words[randomIndex];
    }
    setPreviousWord(newWord)
    setCurrentWord(newWord);
  };

  const handleGameEnd = () => {
    // Reseteamos los estados para empezar una nueva partida
    setRemainingAttempts(3);
    setPoints(0);
    setUsedWords([]);
    setCurrentWord('');
    setIsGameOver(false);
  };

  return (
    <div className="main-container">
      {saveNewData && (
        <InputWordList gameName={'wordMemory'} />
      )}
      {!saveNewData && (
        <div>
          <button onClick={() => navigate('/home')} className="top-button-left"> Volver al menú </button>
          <button onClick={() => setSaveNewData(true)} className="top-button-right"> Guardar nuevos datos </button>
          <div className="main-container" style={{minHeight: '100vh'}}>
            <div className="inside-container">
              {!isGameOver ? (
                <>
                  <div>
                    <p>Intentos restantes: {remainingAttempts}</p>
                    <p>Puntos: {points}</p>
                  </div>
                  <h2 style={{marginLeft: '2.75em'}}>{currentWord}</h2>
                  <div style={{marginTop: '1em'}}>
                    <button style={{marginRight: '0.5em'}} onClick={handleKnownWord}>Palabra Conocida</button>
                    <button style={{marginLeft: '0.5em'}} onClick={handleNewWord}>Palabra Nueva</button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Game Over</h2>
                  <p>Tu puntuación: {points}</p>
                  <button onClick={handleGameEnd}>Empezar de nuevo</button>
                  <div className="chart-container">
                    <canvas id="chartJs" style={{}}></canvas>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

/*
<div style={{width: '500px', height: '250px'}}>
  <canvas id="chartJs"></canvas>
</div>
*/