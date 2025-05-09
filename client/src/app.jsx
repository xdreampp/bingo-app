import React, { useState, useEffect } from "react";
import "./App.css";

function generateBingoBoard() {
  const board = [];
  const usedNumbers = new Set();

  for (let row = 0; row < 5; row++) {
    const rowArr = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        rowArr.push("FREE");
        continue;
      }

      let num;
      do {
        // B: 1–15, I: 16–30, N: 31–45, G: 46–60, O: 61–75
        num = Math.floor(Math.random() * 15) + col * 15 + 1;
      } while (usedNumbers.has(num));
      usedNumbers.add(num);
      rowArr.push(num);
    }
    board.push(rowArr);
  }

  return board;
}

export default function App() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(generateBingoBoard());
  }, []);

  return (
    <div className="App">
      <h1>Bingo!</h1>
      <table className="bingo-board">
        <thead>
          <tr>
            <th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>
          </tr>
        </thead>
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={cell === "FREE" ? "free" : ""}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
