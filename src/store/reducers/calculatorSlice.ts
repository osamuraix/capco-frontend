import { createSlice } from "@reduxjs/toolkit";

import axios from "@/utils/axios";

const initialState = {
  result: 0,
};

export type ActivityState = Readonly<typeof initialState>;

export const postCalculator = (input, sign) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/v1/calculator/${sign}`, {
      ...input,
    });
    dispatch(setResult(response.data.result));
  } catch (error) {
    dispatch(setResult("Error"));
  }
};

const CalculatorSlice = createSlice({
  name: "calculator",
  initialState: initialState as ActivityState,
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload;
    },
    clear: (state) => {
      state.result = 0;
    },
  },
});

export const { setResult, clear } = CalculatorSlice.actions;
export default CalculatorSlice.reducer;
