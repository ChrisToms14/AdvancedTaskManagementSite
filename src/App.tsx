import React from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import { useTicTacToe } from './hooks/useTicTacToe';

function App() {
  const {
    squares,
    currentPlayer,
    winner,
    winningLine,
    gameOver,
    makeMove,
    resetGame,
  } = useTicTacToe();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Game Title */}
        <div className="text-center">
          <div className="inline-block p-6 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl">
            <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
              TIC TAC TOE
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
            <p className="text-white/90 mt-3 font-medium">
              Battle of minds begins!
            </p>
          </div>
        </div>

        {/* Game Status */}
        <GameStatus
          winner={winner}
          currentPlayer={currentPlayer}
          onRestart={resetGame}
        />

        {/* Game Board */}
        <GameBoard
          squares={squares}
          onSquareClick={makeMove}
          winningLine={winningLine}
          gameOver={gameOver}
        />

        {/* Game Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-center text-white/80 space-y-2">
            <p className="font-semibold">🎯 Get 3 in a row to win!</p>
            <p className="text-sm">Horizontal • Vertical • Diagonal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;