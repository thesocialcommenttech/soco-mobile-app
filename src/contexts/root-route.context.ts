import { createContext } from 'react';

export interface RootRouteContext {
  showPostRegisterationFlow: (choice: boolean) => void;
}

export const RootRouteContext = createContext<RootRouteContext>(null);
