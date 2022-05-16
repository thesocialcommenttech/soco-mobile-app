import { createSlice } from '@reduxjs/toolkit';

const initState: {
  name: string;
  userName: string;
  email: string;
  referralCode: string;
  isChecked: boolean;
  gender: string;
  academics: string;
  dob: string;
  profilePic: string;
  coverPic: string;
  caption: string;
  bio: string;
  followers: number;
  following: number;
  views: number;
  accessPortfolio: boolean;
  authenticated: boolean;
} = {
  name: '',
  userName: '',
  email: '',
  referralCode: '',
  isChecked: false,
  gender: '',
  academics: '',
  dob: new Date().toLocaleDateString(),
  profilePic: '',
  coverPic: '',
  caption: '',
  bio: '',
  followers: 0,
  following: 0,
  views: 0,
  accessPortfolio: true,
  authenticated: false
};

export const infoSlice = createSlice({
  name: 'info',
  initialState: initState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.referralCode = action.payload.referralCode;
      state.isChecked = action.payload.isChecked;
      state.gender = action.payload.gender;
      state.academics = action.payload.academics;
      state.dob = action.payload.dob;
      state.profilePic = action.payload.profilePic;
      state.coverPic = action.payload.coverPic;
      state.caption = action.payload.caption;
      state.bio = action.payload.bio;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.views = action.payload.views;
      state.accessPortfolio = action.payload.accessPortfolio;
    },
    setAuth: (state, action) => {
      state.authenticated = action.payload;
    }
  }
});

export const { setUserInfo, setAuth } = infoSlice.actions;

export const selectUserInfo = (state: {
  userinfo: {
    name: string;
    userName: string;
    email: string;
    referralCode: string;
    isChecked: boolean;
    dob: string;
    profilePic: string;
    coverPic: string;
    caption: string;
    bio: string;
    followers: number;
    following: number;
    views: number;
    accessPortfolio: boolean;
  };
}) => state.userinfo;

export const selectAuth = (state: {
  userinfo: {
    authenticated: boolean;
  };
}) => state.userinfo.authenticated;

export default infoSlice.reducer;
