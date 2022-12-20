import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login/login';
import { IAuthStack } from '../types/navigation/auth';

const Stack = createNativeStackNavigator<IAuthStack>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPassword"
        options={{ headerShown: true, title: null, headerShadowVisible: false }}
        getComponent={() =>
          require('~/src/screens/login/forgotPassword').default
        }
      />
      <Stack.Screen
        name="ResetPasswordLinkSent"
        getComponent={() =>
          require('~/src/screens/login/ResetLinkSent').default
        }
      />
      <Stack.Screen
        name="ResetPassword"
        options={{
          title: 'Reset Password',
          headerShown: true,
          headerShadowVisible: false
        }}
        getComponent={() =>
          require('~/src/screens/login/ResetPassword').default
        }
      />
      <Stack.Screen
        name="RegisterOne"
        getComponent={() =>
          require('~/src/screens/register/registerone').default
        }
      />
      <Stack.Screen
        name="RegisterTwo"
        getComponent={() =>
          require('~/src/screens/register/registertwo').default
        }
        options={{
          headerShown: true,
          headerShadowVisible: false,
          title: null
        }}
      />
      <Stack.Screen
        name="PostRegister"
        getComponent={() => require('./optionalStack').default}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
