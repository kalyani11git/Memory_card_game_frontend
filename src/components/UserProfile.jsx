import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/userSlice";
import blankUser from "../assets/blank pic.webp";

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const { name, email, scores = {}, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          <img
            src={blankUser}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <h2 className="text-2xl font-bold mt-3">{name}</h2>
          <p className="text-gray-400">{email}</p>
        </div>

        <div className="mt-5">
          <h3 className="text-lg font-semibold text-blue-400">Game Scores</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(scores).map(([level, score]) => (
              <li
                key={level}
                className="bg-gray-700 p-2 rounded-md shadow-md"
              >
                <span className="font-medium text-yellow-300 capitalize">{level}</span>:{" "}
                <span className="font-semibold text-green-400">{score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
