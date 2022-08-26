import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Interest from '../screens/Setting/interest/interest';
import Notification from '../screens/Setting/notification/notification';
import Main from '../screens/Setting/SettingScreen/SettingScreen';
import Referral from '../screens/Setting/referals/referals';
import SettingSubscriptionsScreen from '../screens/Setting/subsciptions/subscriptions';
import Profile from '../screens/Setting/profile/profile';
import Password from '../screens/Setting/password/password';
import WalletStack from './walletStack';

const Stack = createNativeStackNavigator();

export default function OriginalSettingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Setting" component={Main} />
      <Stack.Screen name="Interests" component={Interest} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Referral" component={Referral} />
      <Stack.Screen
        name="Subscription"
        component={SettingSubscriptionsScreen}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="WalletStack" component={WalletStack} />
    </Stack.Navigator>
  );
}
