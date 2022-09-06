import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/home/home';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import ProfileTab from './profileStack';
import { HomeTabStack } from '../types/navigation/home';

const Stack = createNativeStackNavigator<HomeTabStack>();

function HomeTab() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProfileStack" component={ProfileTab} />
    </Stack.Navigator>
  );
}

export default HomeTab;
