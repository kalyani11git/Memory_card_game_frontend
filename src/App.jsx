import './App.css'
import AppRouter from './components/AppRouter'
import Signup from './components/auth/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <AppRouter/>
    {/* <Signup/> */}
    </>
  )
}

export default App
