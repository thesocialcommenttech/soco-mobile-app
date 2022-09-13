import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DraftsScreen from '../screens/drafts/drafts';
import ProfileScreen from '../screens/profile/profile';
import TrashScreen from '../screens/trash/trash';
import ConnectionsStack from '../screens/connection/ConnectionsStack';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import { ProfileTabStack } from '../types/navigation/profile';
import PortfolioStack from './portfolioStack';

const Stack = createNativeStackNavigator<ProfileTabStack>();

function ProfileTab() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        getId={({ params }) => params.user_id + params.username}
        initialParams={{ username: authUser.username }}
      />
      <Stack.Screen name="PortfolioStack" component={PortfolioStack} />
      <Stack.Screen name="Drafts" component={DraftsScreen} />
      <Stack.Screen name="Trash" component={TrashScreen} />
      <Stack.Screen
        name="Connections"
        getId={({ params }) => params.params.userId}
        component={ConnectionsStack}
      />
    </Stack.Navigator>
  );
}

export default ProfileTab;
