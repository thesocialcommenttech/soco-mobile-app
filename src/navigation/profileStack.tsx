import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DraftsScreen from '../screens/drafts/drafts';
import ProfileScreen from '../screens/profile/profile';
import TrashScreen from '../screens/trash/trash';
import OriginalSettingStack from './settingStack';
import ArtWork from '../screens/createPost/artWork';
import SkillVideo from '../screens/createPost/skillVideo';
import VideoPlayer from '../screens/createPost/videoPlayer';
import Presentation from '../screens/createPost/presentation';
import Link from '../screens/createPost/link';
import ConnectionsStack from '../screens/connection/ConnectionsStack';
import PortfolioStack from './portfolioStack';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import { ProfileTabStack } from '../utils/typings/stack';

const Stack = createNativeStackNavigator<ProfileTabStack>();

function ProfileStack() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
        initialParams={{ username: authUser.username }}
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
        name="Artwork"
        component={ArtWork}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Skill Video"
        component={SkillVideo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Presentation"
        component={Presentation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Link"
        component={Link}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Connections"
        component={ConnectionsStack}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
              name="Portfolio"
              component={PortfolioStack}
              options={{ headerShown: false }}
            /> */}
    </Stack.Navigator>
  );
}

export default ProfileStack;
