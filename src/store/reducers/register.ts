import { createSlice } from '@reduxjs/toolkit';

const initState: {
  name: string;
  userName: string;
  email: string;
  password: string;
  referralCode: string;
  isChecked: boolean;
  gender: string;
  academics: string;
  dob: Date;
} = {
  name: '',
  userName: '',
  email: '',
  password: '',
  referralCode: '',
  isChecked: false,
  gender: '',
  academics: '',
  dob: new Date()
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: initState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.referralCode = action.payload.referralCode;
      state.isChecked = action.payload.isChecked;
      state.gender = action.payload.gender;
      state.academics = action.payload.academics;
      state.dob = action.payload.dob;
    }
  }
});

export const { setUserDetails } = registerSlice.actions;

export const selectUserDetails = (state: {
  register: {
    name: string;
    userName: string;
    email: string;
    password: string;
    referralCode: string;
    isChecked: boolean;
    dob: Date;
  };
}) => state.register;

export default registerSlice.reducer;
