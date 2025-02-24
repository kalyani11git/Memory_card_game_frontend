import { Link } from "react-router-dom";

const Home = () => {
  const cards = [
    "🃏", "🃏", "🎭", "🎭", "🎨", "🎨", "🎵", "🎵", "🎲", "🎲"
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background with neon gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-pink-900 opacity-50"></div>
      
      <h1 className="relative z-10 text-6xl font-extrabold text-blue-400 drop-shadow-lg mb-6">Memory Card Game</h1>
      <p className="relative z-10 text-lg text-gray-300 mb-8 leading-relaxed text-center max-w-2xl">
        Challenge your memory by matching pairs of cards. Stay sharp, beat the clock, and have fun with an exciting neon-themed gaming experience!
      </p>
      
      {/* Spread Cards Randomly Across the Page */}
      {cards.map((card, index) => (
        <div
          key={index}
          className="absolute w-24 h-32 bg-gray-700 border border-blue-400 rounded-lg shadow-lg flex items-center justify-center text-3xl"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
          }}
        >
          {card}
        </div>
      ))}
      
      <Link
        to="/start-game"
        className="relative z-10 px-8 py-4 text-2xl font-bold uppercase tracking-wider bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105 mt-20"
      >
        Start Game
      </Link>
    </div>
  );
};

export default Home;