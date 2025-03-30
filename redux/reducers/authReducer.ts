import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accountResponse: any;
  token: string;
}

const initialState: AuthState = {
  accountResponse: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
