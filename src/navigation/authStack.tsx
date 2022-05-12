import * as React from 'react';
import ForgotPasswordScreen from '../screens/login/forgotPassword';

import LoginScreen from '../screens/login/login';
import RegisterOneScreen from '../screens/register/registerone';
import RegisterTwoScreen from '../screens/register/registertwo';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterOne"
        component={RegisterOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterTwo"
        component={RegisterTwoScreen}
        options={{ headerShown: false }}
      />
    </>
  );
}
