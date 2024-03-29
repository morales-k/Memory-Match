import { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import OneBite from "../assets/images/OneBite.png";
import TwoBite from "../assets/images/TwoBite.png";
import ThreeBite from "../assets/images/ThreeBite.png";
import winSound from "../assets/sounds/win.mp3";
import Button from "./Components/Button";

function Gameboard() {
  const [score, setScore] = useState(0);
  const [cardsFlipped, setCardsFlipped] = useState(0);
  const [numberOfMatches, setNumberOfMatches] = useState(24);
  const [pointsForMatch, setPointsForMatch] = useState(10);
  const [resetGame, setResetGame] = useState(false);
  const [winner, setWinner] = useState(false);
  const [currentBite, setCurrentBite] = useState(OneBite);

  useEffect(() => {
    handleWin();
  }, [score]);

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);

  // Finish winning animation with useEffect to avoid infinite loops.
  useEffect(() => {
    if (currentBite === TwoBite) {
      setTimeout(() => {
        setCurrentBite(ThreeBite);
      }, 300);
    }
  }, [currentBite]);

  function handleWin() {
    if (numberOfMatches * pointsForMatch === score) {
      setWinner(true);
      let sound = new Audio(winSound);
      sound.play();
    }
  }

  function handleReset() {
    setResetGame(true);
    setWinner(false);
    setScore(0);
    setCardsFlipped(0);
    setCurrentBite(OneBite);
    window.scroll(0, 0);
  }

  // Cycles through SVGs to play the winning animation.
  function winAnimation() {
    setTimeout(() => {
      if (currentBite === OneBite) {
        setTimeout(() => {
          setCurrentBite(TwoBite);
        }, 300);
      }
    }, 300);
  }

  /**
   * Sets the games difficulty level, changing the number of matches required to win.
   * 
   * @param {number} mode - Number from 0-2 indicating difficulty level.
   */
  const setGameMode = (mode) => {
    let matches = mode === 0 ? 6 : mode === 1 ? 12 : 24
    handleReset();
    setNumberOfMatches(matches);
  }

  return (
    <div id="gameboard">
      <div className="game-info">
        <h1>Memory Match</h1>
        <div className="col">
            <Button
              style="btn reset-btn"
              perform={handleReset}
              title="RESET" />
        </div>
        <div className="col">
            <h2>Cards Flipped: {cardsFlipped}</h2>
            <h2>Score: {score}</h2>
        </div>
        <div className="game-mode-row">
            <Button
                style="btn game-mode-btn"
                perform={() => setGameMode(0)}
                title="Easy" />
            <Button
                style="btn game-mode-btn"
                perform={() =>setGameMode(1)}
                title="Normal" />
            <Button
                style="btn game-mode-btn"
                perform={() => setGameMode(2)}
                title="Hard" />
        </div>
      </div>
      <div className={winner ? 'winner' : 'hidden'}>
        <p>You Win!</p>
        {winner ? winAnimation() : null}
        <img className="win-donut" src={currentBite} alt="Biten donut." />
        <button className="play-again-btn" onClick={() => handleReset()}>Play Again</button>
      </div>
      <CardContainer 
          handleScore={() => setScore(score + pointsForMatch)} 
          handleFlipCount={() => setCardsFlipped(cardsFlipped + 1)} 
          numberOfMatches={numberOfMatches} 
          resetGame={resetGame} />
    </div>
  );
}

export default Gameboard;
