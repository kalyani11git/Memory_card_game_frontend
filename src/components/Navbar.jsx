import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Navbar = () => {
  const logout = ()=>{
    localStorage.removeItem("token");
    toast.success("logout");
  }
  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 via-purple-800 to-pink-900 text-white py-4 px-6 flex justify-between items-center shadow-lg  z-50 border-b border-blue-400">
      <h1 className="text-4xl font-extrabold text-blue-300 tracking-wide drop-shadow-lg">Memory Game</h1>
      <ul className="flex space-x-8 text-lg font-semibold justify-center items-center">
        <li>
          <Link to="/" className="hover:text-blue-300 transition-transform transform hover:scale-110">Home</Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-300 transition-transform transform hover:scale-110">Profile</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-300 transition-transform transform hover:scale-110">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-blue-300 transition-transform transform hover:scale-110">Signup</Link>
        </li>
        <li>
          <button className="bg-gradient-to-r from-blue-500 to to-blue-400  px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110" onClick={()=>logout()}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
