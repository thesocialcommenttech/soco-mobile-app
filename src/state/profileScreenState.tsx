import create from 'zustand';
import { GetUserData2Response } from '../utils/typings/user-profile_interface/getUserData2.interface';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { PostType } from '../utils/typings/post';

export type UserProfile = {
  postTypes: Record<PostType, User['postTypes'][0]>;
} & Omit<GetUserData2Response['user'], 'postTypes'>;

export interface ProfileScreenState {
  userProfile: UserProfile;
  setUserProfile: (data: UserProfile) => void;
  updateCaption: (newCaption: UserProfile['caption']) => void;
  updateBio: (newBio: UserProfile['bio']) => void;
  updateProfileImage: (newProfileImage: UserProfile['profileImage']) => void;
  updateCoverImage: (newCoverImage: UserProfile['coverImage']) => void;
}

export const useProfileData = create<ProfileScreenState>()(set => ({
  userProfile: null,
  setUserProfile: data => set({ userProfile: data }),
  updateCaption: newCaption =>
    set(state => {
      state.userProfile.caption = newCaption;
      return state;
    }),
  updateBio: newBio =>
    set(state => {
      state.userProfile.bio = newBio;
      return state;
    }),
  updateProfileImage: newProfileImage =>
    set(state => {
      state.userProfile.profileImage = newProfileImage;
      return state;
    }),
  updateCoverImage: newCoverImage =>
    set(state => {
      state.userProfile.coverImage = newCoverImage;
      return state;
    })
}));
