import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export default function App() {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.emit("join", prompt("Enter your name:"));
    socket.on("players", setPlayers);
    socket.on("winner", setWinner);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Bingo Multiplayer</h1>
      <h2>Players:</h2>
      <ul>
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      {winner && <h2>🏆 Winner: {winner} 🏆</h2>}
      <button onClick={() => socket.emit("bingo")}>Call Bingo</button>
    </div>
  );
}