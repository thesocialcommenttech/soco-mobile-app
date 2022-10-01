import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SearchScreen from '../screens/search/search';
import NotificationsScreen from '../screens/notifications/notifications';
import ArtWorkDetail from '../screens/postDetails/artWorkDetail';
import PresentationDetail from '../screens/postDetails/presentationDetail';
import SkillVideoDetail from '../screens/postDetails/skillVideoDetail';
import BottomTabBar from './BottomTabBar';
import SettingStack from './settingStack';
import ArtWork from '../screens/createPost/artWork';
import UploadLink from '../screens/createPost/link';
import Presentation from '../screens/createPost/presentation';
import SkillVideo from '../screens/createPost/skillVideo';
import { IMainStack, PostViewScreenParam } from '../types/navigation/main';

const MyStack = createNativeStackNavigator<IMainStack>();

function MainStack() {
  const getPostScreenId = ({ params }: { params: PostViewScreenParam }) =>
    params.post_id;

  return (
    <MyStack.Navigator screenOptions={{ headerShown: false }}>
      <MyStack.Screen name="App" component={BottomTabBar} />
      <MyStack.Screen name="Search" component={SearchScreen} />
      <MyStack.Screen name="Notifications" component={NotificationsScreen} />

      <MyStack.Screen name="SettingStack" component={SettingStack} />

      {/* Post Screens */}
      <MyStack.Screen
        name="Post_Artwork"
        component={ArtWorkDetail}
        getId={getPostScreenId}
      />
      <MyStack.Screen
        name="Post_Skill"
        component={SkillVideoDetail}
        getId={getPostScreenId}
      />
      <MyStack.Screen
        name="Post_Presentation"
        component={PresentationDetail}
        getId={getPostScreenId}
      />

      {/* Upload Post Screens */}
      <MyStack.Group
        screenOptions={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => null
        }}
      >
        <MyStack.Screen name="Upload_Artwork" component={ArtWork} />
        <MyStack.Screen name="Upload_SkillVideo" component={SkillVideo} />
        <MyStack.Screen name="Upload_Presentation" component={Presentation} />
        <MyStack.Screen name="Upload_Link" component={UploadLink} />
      </MyStack.Group>
    </MyStack.Navigator>
  );
}

export default MainStack;
