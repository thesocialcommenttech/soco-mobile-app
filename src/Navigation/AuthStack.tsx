import * as React from 'react';
import ForgotPasswordScreen from '../Screens/Login/ForgotPassword';

import LoginScreen from '../Screens/Login/Login';
import RegisterScreen from '../Screens/Register/Register';

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
