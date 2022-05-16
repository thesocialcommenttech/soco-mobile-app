import * as React from 'react';

import HomeScreen from '../screens/home/home';
import ProfileScreen from '../screens/profile/profile';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  );
}
