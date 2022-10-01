import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BioScreen from '../screens/bio/bio';
import CategoriesScreen from '../screens/categories/categories';
import CoverPictureScreen from '../screens/coverPicture/coverPicture';

import ProfilePictureScreen from '../screens/profilePicture/profilePicture';

const Stack = createNativeStackNavigator();

function OptionalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      <Stack.Screen name="CoverPicture" component={CoverPictureScreen} />
      <Stack.Screen name="BioScreen" component={BioScreen} />
    </Stack.Navigator>
  );
}

export default OptionalStack;
