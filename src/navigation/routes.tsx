import * as React from 'react';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { getAuthCredentials } from '../lib/auth-credentials';
import store from '../store';

export default function Routes() {
  return (
    <>
      <MainStack />
    </>
  );
  // const [user, setUser] = React.useState({
  //   token: null,
  //   user_id: null
  // });
  // async function getCredentials() {
  //   await getAuthCredentials()
  //     .then(res => {
  //       setUser(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  // React.useEffect(() => {
  //   store.subscribe(() => {
  //     getCredentials();
  //   });
  // });
  // return <>{user.token && user.user_id ? <MainStack /> : <AuthStack />}</>;
}
