import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DiscoverScreen from '../screens/discover/discover';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
