import * as React from 'react';

import HomeScreen from '../Screens/Home/Home';
import ProfileScreen from '../Screens/Profile/Profile';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  );
}
