import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DraftsScreen from '../screens/drafts/drafts';
import ProfileScreen from '../screens/profile/profile';
import TrashScreen from '../screens/trash/trash';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
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

export default ProfileStack;
