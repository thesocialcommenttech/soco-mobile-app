import create from 'zustand';
import {
  RegisterAccountData,
  RegisterPersonalData
} from '../utils/typings/register_interfaces/register.interfce';

export interface RegisterScreenState {
  accountDetails: RegisterAccountData;
  personalDetails: RegisterPersonalData;
  resetRegisterFormData: () => void;
  setAccountDetails: (data: RegisterAccountData) => void;
  setPersonalDetails: (data: RegisterPersonalData) => void;
}

export const useRegisterData = create<RegisterScreenState>()(set => ({
  accountDetails: null,
  personalDetails: null,
  setAccountDetails: data => set({ accountDetails: data }),
  setPersonalDetails: data => set({ personalDetails: data }),
  resetRegisterFormData: () =>
    set({ accountDetails: null, personalDetails: null })
}));
