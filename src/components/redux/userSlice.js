import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL (Update according to your backend)
const API_URL = "https://memory-card-game-backend-dq2v.onrender.com/api/user/profile";

// Async Thunk to Fetch User Data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token"); // Get JWT token from storage

    if (!token) {
      return rejectWithValue("No authentication token found.");
    }

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct format
          },
    });
    console.log("user data",response);
    
    return response.data; // Assuming API returns { name, email, score }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch user data");
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    scores: {} ,
    loading: false,
    error: null,
  },
  reducers: {}, // No manual reducers needed since we're using async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.scores = action.payload.scores;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
