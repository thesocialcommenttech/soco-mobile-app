import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login/login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPassword"
        getComponent={() =>
          require('~/src/screens/login/forgotPassword').default
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
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
