import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../API/UserApi";

export const login = createAsyncThunk("/login", async (payload) => {
  const data = await userApi.login(payload);

  //save data to localstore
  localStorage.setItem("access_token", data.data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.data.user));

  return data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
