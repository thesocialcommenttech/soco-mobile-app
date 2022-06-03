import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DraftsScreen from '../screens/drafts/drafts';
import HomeScreen from '../screens/home/home';
import TrashScreen from '../screens/trash/trash';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drafts"
        component={DraftsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Trash"
        component={TrashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
