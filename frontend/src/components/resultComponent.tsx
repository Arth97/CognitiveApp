/* eslint-disable react-hooks/exhaustive-deps */
// import './NumberMemory.css';
import React, { useState, useEffect, useContext } from 'react';

import Chart, { ChartConfiguration } from 'chart.js/auto';
import { CHART_COLORS, transparentize } from '../utils/chartUtils'
import { ScoreApi } from '../api/backApi';

// import UserInfoContext from '../context/userInfoContext';
import { chartBackgroundColor } from '../plugins/chartJsPlugins'; // Ruta correcta al archivo del plugin
import { useNumberStore } from '../state/numberMemoryState';
import { useUserInfoStore } from '../state/userState';

// TODO: Cada juego puede pasar 'level', 'score', 'time' o yo que se
// TODO: asi que, deberia pasarlo por argumento? todos por zustand?
export const ResultView = ({gameName, score}) => {
  const [userScores, setUserScores] = useState(null);
  const [totalScores, setTotalScores] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  // const {userInfo} = useContext(UserInfoContext)
  const { userInfo } = useUserInfoStore();

  const { level } = useNumberStore();

  const scoreApi = new ScoreApi();

  // TODO: No se si solo desde WordListo mas, este componente se esta ejecutand 2 veces seguidas,
  // TODO: o por lo menos el useEffect inicial (de ahi deduzco qu ese instancie 2 veces)

  // console.log("Componente ResultView renderizado");

  useEffect(() => {
    // console.log("zustand userInfo ", userInfo)
    saveAndRetriveScores();
    // console.log("testeeee", userScores,  totalScores)
  }, []);

  const saveAndRetriveScores = async () => {
    // TODO: Revisar si deberia coger a parte los datos que se van a guardar para mostrarlos en la grafica
    // TODO-check: Quiza se deberia guardar desde cada componente antes de instanciar este
    // scoreApi.saveScore({
    //   userId: userInfo.id,
    //   gameId: gameName,
    //   score: score,
    //   time: null
    // });
    

    // !!! TODO: INVESTIGAR PROMISE.ALL Y VER SI SIRVE PARA ESPERAR A LAS 2 AL MISMO TIEMPO
    // Sino intentar guardar en variables temorales hasta que esten las dos xdxdxd
    await scoreApi.getUserScores({ userId: userInfo.id, gameId: gameName }).then((data) => {
      // console.log("data", data)
      setUserScores(data)
    })
    .catch(() => { })
  
    await scoreApi.getTotalScores({ userId: userInfo.id, gameId: gameName }).then((data) => {
      setTotalScores(data)
    })
    .catch(() => { })
  }

  useEffect(() => {
    // console.log("testeeee", userScores,  totalScores)
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

  }, [userScores && totalScores]);

  return (
    <>
      <div className="chart-container">
        <canvas id="chartJs" style={{}}></canvas>
      </div>
    </>
  );
};
