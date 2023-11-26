import '../styles/LetterMix.css';
import React, { useState, useEffect } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const LetterMix = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [wordsFound, setWordsFound] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState({ row: 0, col: 0 });
  const [endCell, setEndCell] = useState({ row: 0, col: 0 });

  useEffect(() => {
    // Generar una nueva sopa de letras al cargar la página
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid: string[][] = [];
    for (let i = 0; i < 12; i++) {
      const row: string[] = [];
      for (let j = 0; j < 12; j++) {
        // Generar letra aleatoria
        const randomLetter = LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
        row.push(randomLetter);
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    console.log("pre grid", grid)
    setSelectedLetters([]);
    setWordsFound([]);
  };

  const handleLetterClick = (letter: string) => {
    // Agregar o quitar letra de las seleccionadas
    if (selectedLetters.includes(letter)) {
      setSelectedLetters(selectedLetters.filter((l) => l !== letter));
    } else {
      setSelectedLetters([...selectedLetters, letter]);
    }
  };

  // useEffect(() => {
  //   checkWords();
  // }, [selectedLetters]);

  const checkWords = () => {
    const selectedWord = selectedLetters.join('');
    // Verificar si la palabra seleccionada está en la sopa de letras
    if (!grid.length) return;
    for (let i = 0; i < 12; i++) {
      console.log("grid", grid)
      const rowWord = grid[i].join('');
      if (rowWord.includes(selectedWord)) {
        setWordsFound([...wordsFound, selectedWord]);
        setSelectedLetters([]);
        break;
      }
    }
  };

  
  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging) {
      setEndCell({ row, col });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const isDiagonal = (startCell, endCell) => {
    return Math.abs(startCell.row - endCell.row) === Math.abs(startCell.col - endCell.col);
  };
  
  const isCellSelected = (row, col) => {
    const diagonal = isDiagonal(startCell, endCell);
  
    if (diagonal) {
      // Verificar si la celda actual está en la lista de celdas en diagonal
      const diagonalCells = getDiagonalCells(startCell, endCell);
      return diagonalCells.some((cell) => cell.row === row && cell.col === col);
    } else {
      // Verificar si la celda actual está en la misma fila o columna que las celdas de inicio y fin
      const isRowInRange = row >= Math.min(startCell.row, endCell.row) && row <= Math.max(startCell.row, endCell.row);
      const isColInRange = col >= Math.min(startCell.col, endCell.col) && col <= Math.max(startCell.col, endCell.col);
      return (isRowInRange && col === startCell.col && col === endCell.col) || 
             (isColInRange && row === startCell.row && row === endCell.row);
    }
  };

  const getDiagonalCells = (start, end) => {
    const cells = [];
    const { row: startRow, col: startCol } = start;
    const { row: endRow, col: endCol } = end;
    const rowDir = startRow < endRow ? 1 : -1;
    const colDir = startCol < endCol ? 1 : -1;

    let row = startRow;
    let col = startCol;

    while (row !== endRow && col !== endCol) {
      cells.push({ row, col });
      row += rowDir;
      col += colDir;
    }

    cells.push({ row: endRow, col: endCol });
    return cells;
  };
  

  return (
    <div className="main-container">
      <h2>LetterMix - Sopa de Letras</h2>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((letter, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-cell ${isCellSelected(rowIndex, colIndex) ? "selected" : ""}`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Palabras encontradas:</p>
        <ul className="letterminx-ul">
          {wordsFound.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
      <button className="lettermix-button" onClick={generateGrid}>Nueva Sopa de Letras</button>
    </div>
  );
};

