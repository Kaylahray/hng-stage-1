import React, { useState, useEffect } from "react";
import "./App.css";

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#008080",
    "#000080",
  ];

  const generateRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const generateColorOptions = (correctColor) => {
    const options = [correctColor];
    while (options.length < 6) {
      const newColor = generateRandomColor();
      if (!options.includes(newColor)) {
        options.push(newColor);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const newTargetColor = generateRandomColor();
    setTargetColor(newTargetColor);
    setColorOptions(generateColorOptions(newTargetColor));
    setGameStatus("");
    setShowStatus(false);
  };

  const handleNewGame = () => {
    setScore(0);
    startNewRound();
  };

  const handleGuess = (color) => {
    setShowStatus(true);
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("correct");
      setTimeout(startNewRound, 1500);
    } else {
      setGameStatus("wrong");
      setTimeout(startNewRound, 1500);
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <h1 className="game-title">Color Guessing Game</h1>

        <div data-testid="gameInstructions" className="game-instructions">
          <p>The large box above the buttons shows the target color.</p>
          <p>Click on any button below that matches this target color!</p>
        </div>

        <div
          data-testid="colorBox"
          className="color-box"
          style={{ backgroundColor: targetColor }}
        />

        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            />
          ))}
        </div>
        <div
          data-testid="gameStatus"
          className={`game-status ${showStatus ? "visible" : ""} ${
            gameStatus === "correct" ? "status-correct" : "status-wrong"
          }`}
        >
          {gameStatus === "correct"
            ? "Correct! Great job!"
            : "Wrong guess! Try again!"}
        </div>

        <div className="score-container" data-testid="score">
          Score: {score}
        </div>

        <button
          data-testid="newGameButton"
          onClick={handleNewGame}
          className="new-game-button"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ColorGame;
