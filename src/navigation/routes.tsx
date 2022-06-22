import * as React from 'react';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { getAuthCredentials } from '../lib/auth-credentials';
import store from '../store';
import OptionalStack from './optionalStack';

export default function Routes() {
  const [user, setUser] = React.useState({
    token: null,
    user_id: null
  });
  async function getCredentials() {
    await getAuthCredentials()
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        console.log('routes.tsx', err);
      });
  }

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      getCredentials();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <>{!user.token ? <AuthStack /> : <MainStack />}</>;
}
