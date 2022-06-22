import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ForgotPasswordScreen from '../screens/login/forgotPassword';

import LoginScreen from '../screens/login/login';
import RegisterOneScreen from '../screens/register/registerone';
import RegisterTwoScreen from '../screens/register/registertwo';
import OptionalStack from './optionalStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="OptionalInfo"
          component={OptionalStack}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
