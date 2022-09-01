import React, {
  createContext,
  ReactElement,
  useContext,
  useState
} from 'react';
import { UserPortfolioProfile } from '../utils/typings/user-portfolio_interface/getPortforlioProfileData.interface';
import { PortfolioData } from '../utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';

interface IPortfolioDataContext {
  profile: UserPortfolioProfile;
  portfolio: PortfolioData;
  setPortfolio: (data: PortfolioData) => void;
  setProfile: (data: UserPortfolioProfile) => void;
}

export const PortfolioContext = createContext<IPortfolioDataContext>({
  portfolio: null,
  profile: null,
  setPortfolio: data => {},
  setProfile: data => {}
});

export function PortfolioDataProvider(props: {
  children: ReactElement | ReactElement[];
}) {
  const [profile, setProfile] = useState<UserPortfolioProfile>();
  const [portfolio, setPortfolio] = useState<PortfolioData>();

  return (
    <PortfolioContext.Provider
      value={{ profile, setProfile, portfolio, setPortfolio }}
    >
      {props.children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolioData = () => useContext(PortfolioContext);
