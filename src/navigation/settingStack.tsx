import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/home/home';
import InterestScreen from '../screens/Setting/interest/interest'
import Subscriptions from '../screens/Setting/subsciptions/subscriptions';
import Notification from '../screens/Setting/notification/notification';
import Referals from '../screens/Setting/Referals/referals';

const Tab = createMaterialTopTabNavigator();

export default function settingStack() {
  return (
    <NavigationContainer>  
     <Tab.Navigator 
            screenOptions={{ tabBarScrollEnabled: true,tabBarIndicatorStyle:{
                backgroundColor:"blue",
                height:3, },
            }}
            sceneContainerStyle={{ backgroundColor: "white" }}
     >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Interest" component={InterestScreen} />
      <Tab.Screen name="Subscription" component={Subscriptions} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Referral" component={Referals} />
    </Tab.Navigator>
    
    </NavigationContainer>
  );
}