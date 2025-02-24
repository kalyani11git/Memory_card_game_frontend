import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/userSlice"; // Import fetchUser action
import shuffle from "lodash.shuffle";
import { useNavigate } from "react-router-dom";

const easySymbols = ["🦄", "🚀", "🌈", "🔥", "⚡", "🎸", "💎", "🎯"];
const mediumSymbols = [...easySymbols, "🎩", "🎃", "🍕", "🎁"];
const hardSymbols = [...mediumSymbols, "🐉", "👑", "🏆", "🎮"];

const levels = {
  easy: { symbols: easySymbols, time: 120 },
  medium: { symbols: mediumSymbols, time: 120 },
  hard: { symbols: hardSymbols, time: 120 },
};

const Game = () => {
  const dispatch = useDispatch();
  
  // Get user data from Redux
  const { name, scores } = useSelector((state) => state.user);

  const navigate = useNavigate();

  

  
  // Game state
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [level, setLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [showLevelSelection, setShowLevelSelection] = useState(true);

  // Fetch user data when component mounts
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const startGame = (selectedLevel) => {
    const { symbols, time } = levels[selectedLevel];
    const shuffledCards = shuffle([...symbols, ...symbols]).map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
  
    setLevel(selectedLevel);
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setScore(0); // 🔥 Always start from 0
    setGameOver(false);
    setGameWon(false);
    setTimeLeft(time);
    setShowLevelSelection(false);
  
    // Show cards for 2 seconds
    setShowCards(true);
    setTimeout(() => {
      setShowCards(false);
    }, 2000);
  };
  

  useEffect(() => {
    if (timeLeft > 0 && !gameWon) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameWon]);


  const handleCardClick = (index) => {
    if (gameOver || gameWon) return;
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped([...flipped, index]);
      setScore((prevScore) => prevScore + 10);
    }
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setScore((prevScore) => prevScore + 50);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
      
      // Calculate final score based on time left
      const finalScore = score + timeLeft * 10; 
      
      if (finalScore > (scores[level] || 0)) {
        updateHighScore(level, finalScore); // Update the database with the better score
      }
    }
  }, [matched, cards, score, timeLeft]); // Added `timeLeft` dependency
  
  

 const updateHighScore = async (level, newScore) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("https://memory-card-game-backend-dq2v.onrender.com/api/user/update-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ level, score: newScore }),
    });

    const data = await response.json();
    console.log("Score update response:", data);

    if (response.ok) {
      dispatch(fetchUser()); // 🔥 Refresh Redux store to get updated scores
    } else {
      console.error("Failed to update score:", data.message);
    }
  } catch (error) {
    console.error("Error updating high score:", error);
  }
};


const handleNavigateStartGame=()=>{
  navigate('/');
}

  
  

  return (
    <div className="flex flex-col items-center p-5 bg-gray-900 min-h-screen text-white relative">
      {/* Header with Timer and High Score */}
      <div className="absolute top-4 right-4 flex flex-col items-end">
        <p className="text-lg bg-gray-700 px-4 py-2 rounded-lg shadow-md">
          ⏳ Time Left: <span className="font-bold text-yellow-400">{timeLeft}s</span>
        </p>
        <p className="text-lg bg-gray-700 px-4 py-2 rounded-lg shadow-md mt-2">
          🏆 High Score: <span className="font-bold text-green-400">{scores[level] || 0}</span>
        </p>
      </div>

      <h1 className="text-3xl font-bold text-blue-400 mb-6">Memory Game</h1>
      <p className="text-xl mb-4">Score: {score}</p>

      {/* Cards Grid */}
      <div
        className={`grid ${
          level === "easy"
            ? "grid-cols-4"
            : level === "medium"
            ? "grid-cols-6"
            : "grid-cols-8"
        } gap-4`}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-20 h-24 flex items-center justify-center text-3xl bg-gray-700 rounded-lg cursor-pointer shadow-lg transition-transform duration-300 ${
              flipped.includes(index) || matched.includes(index) || showCards
                ? "bg-blue-500 scale-105"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {(flipped.includes(index) || matched.includes(index) || showCards)
              ? card.emoji
              : "❓"}
          </div>
        ))}
      </div>

      {/* Winning Message */}
      {gameWon && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-green-400">🎉 Congratulations! You Won! 🎉</h2>
            {score > (scores[level] || 0) && (
              <p className="text-yellow-300">New High Score: {score} 🔥</p>
            )}
            <button
             onClick={()=>handleNavigateStartGame()}
              className="mt-4 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Game Over Message */}
      {gameOver && !gameWon && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-400">⏳ Time's Up! You Lost! 😢</h2>
            <button
             onClick={()=>handleNavigateStartGame()}
              className="mt-4 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Level Selection */}
      {showLevelSelection && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Select Difficulty Level</h2>
            <button
              onClick={() => startGame("easy")}
              className="px-6 py-2 bg-green-600 rounded-lg m-2 hover:bg-green-700 transition"
            >
              Easy
            </button>
            <button
              onClick={() => startGame("medium")}
              className="px-6 py-2 bg-yellow-600 rounded-lg m-2 hover:bg-yellow-700 transition"
            >
              Medium
            </button>
            <button
              onClick={() => startGame("hard")}
              className="px-6 py-2 bg-red-600 rounded-lg m-2 hover:bg-red-700 transition"
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
