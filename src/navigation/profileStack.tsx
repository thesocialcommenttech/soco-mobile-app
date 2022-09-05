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
import UploadLink from '../screens/createPost/link';
import ConnectionsStack from '../screens/connection/ConnectionsStack';
import PortfolioStack from './portfolioStack';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';
import {
  ProfileTabStack,
  ProfileTab_ScreenProps
} from '../utils/typings/stack';
import Button from '../components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator<ProfileTabStack>();

function ProfileStack() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);
  const navigation = useNavigation<ProfileTab_ScreenProps['navigation']>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
        getId={({ params }) => params.user_id + params.username}
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
        name="Connections"
        component={ConnectionsStack}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{
          headerShadowVisible: false,
          headerTitle: () => null
        }}
      >
        <Stack.Screen name="Artwork" component={ArtWork} />
        <Stack.Screen name="Skill Video" component={SkillVideo} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="Presentation" component={Presentation} />
        <Stack.Screen name="Link" component={UploadLink} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ProfileStack;
