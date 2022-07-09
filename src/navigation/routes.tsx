import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, View } from 'react-native';

import MainStack from './mainStack';
import AuthStack from './authStack';
import { getAuthCredentials } from '../lib/auth-credentials';
import { loginAction } from '../store/actions/auth';
import { IRootReducer } from '../store/reducers';
import Logo from '~/src/assets/images/logos/thesocialcomment-logo.png';
import TextLogo from '~/src/assets/images/logos/image.png';

export default function Routes() {
  const dispatch = useDispatch();
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [loading, setLoading] = useState(true);

  async function getCredentials() {
    try {
      const authCredentials = await getAuthCredentials();

      if (
        authCredentials.token &&
        authCredentials.user &&
        authCredentials.user_id
      ) {
        dispatch(
          loginAction({
            token: authCredentials.token,
            user: authCredentials.user
          })
        );
      }
    } catch (err) {
      console.log('routes.tsx', err);
    }
  }

  useEffect(() => {
    setLoading(true);
    getCredentials().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.splashScreenCt}>
        <Image source={Logo} style={{ width: 50, height: 50 }} />
        <Image source={TextLogo} style={{ width: 200 }} resizeMode="contain" />
      </View>
    );
  } else if (auth.authenticated) {
    return <MainStack />;
  } else {
    return <AuthStack />;
  }
}

const styles = StyleSheet.create({
  splashScreenCt: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
