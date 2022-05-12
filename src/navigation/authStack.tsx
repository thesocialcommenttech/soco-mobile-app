import * as React from 'react';
import ForgotPasswordScreen from '../screens/login/forgotPassword';

import LoginScreen from '../screens/login/login';
import RegisterScreen from '../screens/register/register';

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
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </>
  );
}
