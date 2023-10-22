
// import './NumberMemory.css';
import React, { useState, useEffect } from 'react';
import { useNumberStore } from '../../state/numberMemoryState';

export const ShowNumber = ({ progress }) => {

  const { randomNumber, level } = useNumberStore();

  return (
    <>
      <>
        <p>Nivel: {level}</p>
        <p>Memoriza el número:</p>
        <p>{randomNumber}</p>
      </>

      {progress > 0 && progress < 100 && (
        <div>
          <div
            style={{ width: `${progress}%`, height: '10px', background: 'green' }}
          ></div>
        </div>
      )}
    </>
  );
};
