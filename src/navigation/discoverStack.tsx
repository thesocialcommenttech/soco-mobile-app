import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DiscoverScreen from '../screens/discover/discover';
import ProfileTab from './profileStack';
import { DiscoverStack } from '../types/navigation/discover';

const Stack = createNativeStackNavigator<DiscoverStack>();

function DiscoverTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DiscoverTab;
