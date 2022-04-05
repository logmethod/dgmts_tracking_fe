import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../services";

export const getEmployees = createAsyncThunk(
  "project/getEmployees",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}users/ALL`, {
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

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
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
    [getEmployees.fulfilled]: (state, { payload }) => {
      state.employee = payload.records;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.msg;
    },
    [getEmployees.pending]: (state) => {
      state.isFetching = true;
    },
    [getEmployees.rejected]: (state, { payload }) => {
      console.warn("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

export const employeeSelector = (state) => state.employee;

export default employeeSlice.reducer;
