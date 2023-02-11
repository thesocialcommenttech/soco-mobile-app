import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';

import { getAuthCredentials } from '../lib/auth-credentials';
import { loginAction } from '../store/actions/auth';
import { IRootReducer } from '../store/reducers';
import Logo from '~/src/assets/images/logos/thesocialcomment-logo.png';
// import TextLogo from '~/src/assets/images/logos/image.png';
import {
  DefaultTheme,
  getStateFromPath,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootRouteContext } from '../contexts/root-route.context';
import { routingInstrumentation } from '../utils/monitoring/sentry';
import { IRootStack } from '../types/navigation/root';
import { URL } from 'react-native-url-polyfill';

const RootStack = createNativeStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [loading, setLoading] = useState(true);
  const [showPostRegisterationFlow, setShowPostRegisterationFlow] =
    useState(false);
  const navigationContainerRef = useRef();

  const RootRouteContextValue = useMemo<RootRouteContext>(
    () => ({
      showPostRegisterationFlow: choice => setShowPostRegisterationFlow(choice)
    }),
    []
  );

  const initialRouteName = useMemo(() => {
    if (!auth.authenticated) {
      return 'auth';
    } else if (auth.authenticated && showPostRegisterationFlow) {
      return 'post_registeration_flow';
    } else {
      return 'main';
    }
  }, [auth, showPostRegisterationFlow]);

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
      console.error('routes.tsx', err);
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
        <NavigationContainer<IRootStack>
          linking={{
            prefixes: [
              'https://soco.co.in',
              'soco://',
              'https://thesocialcomment.com',
              'thesocialcomment://'
            ],
            config: {
              screens: {
                auth: {
                  screens: {
                    ResetPassword: {
                      path: 'reset-password/:hash'
                    }
                  }
                },
                main: {
                  screens: {
                    Post_Blog: 'blog/:title',
                    Post_Artwork: 'artwork/:title',
                    Post_Article: 'article/:title',
                    Post_Skill: 'skill/:title',
                    Post_Project: 'project/:title',
                    Post_Presentation: 'presentation/:title',
                  }
                }
              }
            },
            getStateFromPath: (path, options) => {
              // domain the prefixed only to make url valid
              const url = new URL(`https://thesocialcomment.com${path}`);

              // For post view url converting query parm pid to post_id
              if (
                /^\/(blog|artwork|article|skill|project|presentation)\//.test(
                  url.pathname
                )
              ) {
                const postId = url.searchParams.get('pid');
                url.searchParams.delete('pid');
                url.searchParams.append('post_id', postId);

                path = url.pathname + url.search;
              }

              return getStateFromPath(path, options);
            }
          }}
          ref={navigationContainerRef}
          onReady={() => {
            // Register the navigation container with the instrumentation
            routingInstrumentation.registerNavigationContainer(
              navigationContainerRef
            );
          }}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: 'white'
            }
          }}
        >
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRouteName}
          >
            <RootStack.Screen
              name="auth"
              getComponent={() => require('./authStack').default}
            />
            {/* <RootStack.Screen
              name="post_registeration_flow"
              getComponent={() => require('./optionalStack').default}
            /> */}
            <RootStack.Screen
              name="main"
              getComponent={() => require('./mainStack').default}
            />
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
