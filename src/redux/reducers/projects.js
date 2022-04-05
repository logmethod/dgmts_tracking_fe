import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}projects/get`, {
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

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
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
    [getProjects.fulfilled]: (state, { payload }) => {
      state.projects = payload.records;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.msg;
    },
    [getProjects.pending]: (state) => {
      state.isFetching = true;
    },
    [getProjects.rejected]: (state, { payload }) => {
      console.warn("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const projectSelector = (state) => state.projects;

export default projectSlice.reducer;
