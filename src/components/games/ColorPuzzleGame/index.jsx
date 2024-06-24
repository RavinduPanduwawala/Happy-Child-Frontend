import React, { useState, useEffect } from 'react';

// Import custom styles
import styles from './ColorPuzzleGame.module.css';

const ColorPuzzleGame = ({ onGameOver }) => {

  // Define the available colors for the game
  const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Brown', 'Pink', 'Teal'];

  // State variables to manage game state
  const [targetColor, setTargetColor] = useState(''); // The color the user needs to match
  const [selectedColor, setSelectedColor] = useState(''); // The color the user selects
  const [score, setScore] = useState(0); // User's score
  const [selectionCount, setSelectionCount] = useState(0); // Number of color selections made by the user - total is 9 rounds
  const [gameOver, setGameOver] = useState(false); // Flag to indicate if the game is over

  // Function to generate a random target color
  const generateRandomTargetColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to reset the game
  const resetGame = () => {
    setSelectedColor('');
    setScore(0);
    setSelectionCount(0);
    setGameOver(false);
    setTargetColor(generateRandomTargetColor());
  };

  // Function to handle color selection
  const handleColorSelect = (color) => {
    if (!gameOver) {
      setSelectedColor(color);
      setSelectionCount((prevCount) => prevCount + 1);
    }
  };

  // Function to check if selected color matches the target color
  const checkColorMatch = () => {
    if (selectedColor === targetColor) {
      setScore((prevScore) => prevScore + 1);
    }

    // Reset selected color
    setSelectedColor('');

    // Regenerate Random color to next step
    setTargetColor(generateRandomTargetColor());
  };

  // Function to calculate final score and end the game
  const calculateFinalScore = () => {
    setGameOver(true);
    onGameOver(score)
  };

  // Check color match whenever selectedColor changes
  useEffect(() => {
    if (selectedColor !== '') {
      checkColorMatch();
    }
  }, [selectedColor]);

  // End the game after 9 color selections
  useEffect(() => {
    if (selectionCount === 9) {
      calculateFinalScore();
    }
  }, [selectionCount]);

  // Generate initial target color when the component mounts
  useEffect(() => {
    setTargetColor(generateRandomTargetColor());
  }, []);

  return (
    <div className={styles.container}>
      {!gameOver && (
        <div>
          <h1>Color Puzzle Game</h1>
          <div>
            <h2>Instructions:</h2>
            <p>Select the color that matches the target color. You have 9 attempts.</p>
            {selectionCount < 9 && <p>Attempt: {selectionCount}/9</p>}
          </div>
          <h2>Target Color : {targetColor}</h2>
          <div className={styles.grid}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={`${styles.box} ${selectedColor === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
          <div className={styles.controls}>
            <button className={styles.button} onClick={resetGame}>Reset Game</button>
          </div>
        </div>
      )}
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <h3>Thank you for playing.</h3>
        </div>
      )}
    </div>
  );
};

export default ColorPuzzleGame;
