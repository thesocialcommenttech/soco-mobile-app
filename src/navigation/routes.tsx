import * as React from 'react';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/reducers/info';

export default function Routes() {
  const user = useSelector(selectAuth);
  console.log('user', user);
  return <>{user ? <MainStack /> : <AuthStack />}</>;
}
