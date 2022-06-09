import * as React from 'react';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/reducers/info';
import OptionalStack from './optionalStack';

export default function Routes() {
  const user = useSelector(selectAuth);
  return (
    <>
      {user === 0 ? <AuthStack /> : <></>}
      {user === 1 ? <OptionalStack /> : <></>}
      {user === 2 ? <MainStack /> : <></>}
    </>
  );
}
