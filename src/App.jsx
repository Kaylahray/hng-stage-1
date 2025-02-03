import { useState } from "react";
import "./App.css";

const COLORS = ["green", "blue", "yellow", "magenta", "purple", "red"];

const App = () => {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState(
    COLORS[Math.floor(Math.random() * COLORS.length)]
  );
  const [status, setStatus] = useState("Choose the right color");

  const handleGuess = (clr) => {
    if (clr === color) {
      setStatus("Correct!");
      setScore((prev) => prev + 1);
      setColor(COLORS[Math.floor(Math.random() * COLORS.length)]); // Change target color after correct guess
    } else {
      setStatus("Wrong!");
    }
  };

  const handleReset = () => {
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    setScore(0);
    setStatus("");
  };

  return (
    <div>
      <div className="target-box" style={{ backgroundColor: color }}></div>
      <p>Score: {score}</p>
      <div>{status}</div>

      {COLORS.map((clr) => (
        <div
          key={clr}
          className={`box ${clr}`}
          onClick={() => handleGuess(clr)}
        ></div>
      ))}

      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default App;
