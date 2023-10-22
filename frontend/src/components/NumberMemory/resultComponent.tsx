
// import './NumberMemory.css';
import React, { useState, useEffect, useContext } from 'react';

import Chart, { ChartConfiguration } from 'chart.js/auto';
import { CHART_COLORS, transparentize } from '../../utils/chartUtils'
import { ScoreApi } from '../../api/backApi';

import UserInfoContext from '../../context/userInfoContext';
import { chartBackgroundColor } from '../../plugins/chartJsPlugins'; // Ruta correcta al archivo del plugin
import { useNumberStore } from '../../state/numberMemoryState';

export const ResultView = () => {

  const [userScores, setUserScores] = useState(null);
  const [totalScores, setTotalScores] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  const {userInfo} = useContext(UserInfoContext)

  const { level } = useNumberStore();

  const scoreApi = new ScoreApi();

  useEffect(() => {
    scoreApi.saveScore({
      userId: userInfo.id,
      gameId: 'numberMemory',
      score: level,
      time: null
    });
    
    scoreApi.getUserScores({ userId: userInfo.id, gameId: 'numberMemory' }).then((data) => {
      setUserScores(data)
    })
    .catch(() => { })
  
    scoreApi.getTotalScores({ userId: userInfo.id, gameId: 'numberMemory' }).then((data) => {
      setTotalScores(data)
    })
    .catch(() => { })
  }, []);

  useEffect(() => {
    if (!userScores || !totalScores) return;

    // userScores[points]++;
    // totalScores[points]++;

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

  }, [userScores, totalScores]);

  return (
    <>
      <div className="chart-container">
        <canvas id="chartJs" style={{}}></canvas>
      </div>
    </>
  );
};
