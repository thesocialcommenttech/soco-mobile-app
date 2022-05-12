import { createSlice } from '@reduxjs/toolkit';

const initState: {
  email: string;
  password: string;
} = {
  email: '',
  password: ''
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initState,
  reducers: {
    setUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    }
  }
});

export const { setUserDetails } = loginSlice.actions;

export const selectUserDetails = (state: {
  login: {
    email: string;
    password: string;
  };
}) => state.login;

export default loginSlice.reducer;
