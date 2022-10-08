import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';

import { getAuthCredentials } from '../lib/auth-credentials';
import { loginAction } from '../store/actions/auth';
import { IRootReducer } from '../store/reducers';
import Logo from '~/src/assets/images/logos/thesocialcomment-logo.png';
// import TextLogo from '~/src/assets/images/logos/image.png';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRouteContext } from '../contexts/root-route.context';

const RootStack = createNativeStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [loading, setLoading] = useState(true);
  const [showPostRegisterationFlow, setShowPostRegisterationFlow] =
    useState(false);

  const RootRouteContextValue = useMemo<RootRouteContext>(
    () => ({
      showPostRegisterationFlow: choice => setShowPostRegisterationFlow(choice)
    }),
    []
  );

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
        <Image source={Logo} style={{ width: 100, height: 100 }} />
        {/* <Image
          source={TextLogo}
          style={{ height: 15, position: 'absolute', bottom: 30, opacity: 0.25 }}
          resizeMode="contain"
        /> */}
      </View>
    );
  } else {
    return (
      <RootRouteContext.Provider value={RootRouteContextValue}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: 'white'
            }
          }}
        >
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {(() => {
              if (!auth.authenticated) {
                return (
                  <RootStack.Screen
                    name="auth"
                    getComponent={() => require('./authStack').default}
                  />
                );
              } else if (auth.authenticated && showPostRegisterationFlow) {
                return (
                  <RootStack.Screen
                    name="post_registeration_flow"
                    getComponent={() => require('./optionalStack').default}
                  />
                );
              } else {
                return (
                  <RootStack.Screen
                    name="main"
                    getComponent={() => require('./mainStack').default}
                  />
                );
              }
            })()}
          </RootStack.Navigator>
        </NavigationContainer>
      </RootRouteContext.Provider>
    );
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
