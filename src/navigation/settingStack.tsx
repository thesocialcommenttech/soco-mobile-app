import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Interest from '../screens/Setting/interest/interest';
import Notification from '../screens/Setting/notification/notification';
import Main from '../screens/Setting/SettingScreen/SettingScreen';
import Referral from '../screens/Setting/referals/referals';
import Subscriptions from '../screens/Setting/subsciptions/subscriptions';
import Profile from '../screens/Setting/profile/profile';
import Password from '../screens/Setting/password/password';
import Wallet from '../screens/Setting/wallet/wallet';

const Stack = createNativeStackNavigator();

export default function originalSettingStack() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    }
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Setting">
        <Stack.Screen name="Setting" component={Main} />
        <Stack.Screen name="Interests" component={Interest} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Referral" component={Referral} />
        <Stack.Screen name="Subscription" component={Subscriptions} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Wallet" component={Wallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
