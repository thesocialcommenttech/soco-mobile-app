import React, {
  createContext,
  ReactElement,
  useContext,
  useRef,
  useState
} from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { UserPortfolioProfile } from '../utils/typings/user-portfolio_interface/getPortforlioProfileData.interface';
import { PortfolioData } from '../utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';

interface IPortfolioDataContext {
  profile: UserPortfolioProfile;
  portfolio: PortfolioData;
  setPortfolio: (data: PortfolioData) => void;
  setProfile: (data: UserPortfolioProfile) => void;
}

export const PortfolioContext =
  createContext<StoreApi<IPortfolioDataContext>>(null);

export function PortfolioDataProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const store = useRef(
    createStore<IPortfolioDataContext>(set => ({
      portfolio: null,
      profile: null,
      setPortfolio: data => set({ portfolio: data }),
      setProfile: data => set({ profile: data })
    }))
  );

  return (
    <PortfolioContext.Provider value={store.current}>
      {props.children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolioData = () => {
  const store = useContext(PortfolioContext);
  return useStore(store);
};
