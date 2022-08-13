import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DiscoverScreen from '../screens/discover/discover';
import DraftsScreen from '../screens/drafts/drafts';
import TrashScreen from '../screens/trash/trash';
import OriginalSettingStack from './settingStack';
import PortfolioStack from './portfolioStack';
import ProfileStack from './profileStack';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
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
      <Stack.Screen
        name="Setting"
        component={OriginalSettingStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Portfolio"
        component={PortfolioStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DiscoverStack;
