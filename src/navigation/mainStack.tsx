import * as React from 'react';

import HomeScreen from '../screens/home/home';
import ProfileScreen from '../screens/profile/profile';
import SettingStack from './settingStack'

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingStack}/>
    </>
  );
}
