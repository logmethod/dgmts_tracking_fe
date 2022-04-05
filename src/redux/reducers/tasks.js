import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const getTasks = createAsyncThunk(
  "project/getTasks",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}tasks/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data", data);
      if (response.status === 200) {
        return data;
      }
      return rejectWithValue(data?.msg);
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      return state;
    },
  },
  extraReducers: {
    [getTasks.fulfilled]: (state, { payload }) => {
      state.tasks = payload.records;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.msg;
    },
    [getTasks.pending]: (state) => {
      state.isFetching = true;
    },
    [getTasks.rejected]: (state, { payload }) => {
      console.warn("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const tasksSelector = (state) => state.tasks;

export default tasksSlice.reducer;
