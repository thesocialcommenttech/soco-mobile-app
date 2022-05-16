import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PortfolioScreen from '../screens/portfolio/portfolio';

const Stack = createNativeStackNavigator();

const PortfolioStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PortfolioStack;
