import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/redux/userSlice"; // Import the slice

const store = configureStore({
  reducer: {
    user: userReducer
  }
});

export default store;
