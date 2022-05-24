import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import mainSettingScreen from '../screens/Setting/mainSettingScreen/mainSettingScreen';
import InterestScreen from '../screens/Setting/interest/interest';
import Subscriptions from '../screens/Setting/subsciptions/subscriptions';
import Notification from '../screens/Setting/notification/notification';
import Referals from '../screens/Setting/referals/referals';

const Tab = createMaterialTopTabNavigator();

export default function settingStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: 'blue',
            height: 3
          }
        }}
        sceneContainerStyle={styles.container}
      >
        <Tab.Screen name="Home" component={mainSettingScreen} />
        <Tab.Screen name="Interest" component={InterestScreen} />
        <Tab.Screen name="Subscription" component={Subscriptions} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Referral" component={Referals} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});
