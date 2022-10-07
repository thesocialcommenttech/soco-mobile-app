import React from 'react';
import Portfolio from '../screens/portfolio/portfolio';
// import ArtWorkDetail from '../screens/postDetails/artWorkDetail';
// import SkillVideoDetail from '../screens/postDetails/skillVideoDetail';
// import PresentationDetail from '../screens/postDetails/presentationDetail';
import UpdateBio from '../screens/portfolio/updatePortfolio/updateBio';
import AddExperience from '../screens/portfolio/updatePortfolio/addExperience';
import AddCertificate from '../screens/portfolio/updatePortfolio/addCertificate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddSkill from '../screens/portfolio/updatePortfolio/addSkill';
import AddEducation from '../screens/portfolio/updatePortfolio/addEducation';
import AddBlog from '../screens/portfolio/updatePortfolio/addBlog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PortfolioDataProvider } from '../contexts/portfolio.context';
import Button from '../components/theme/Button';
import { Black } from '../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import AddSocialAccounts from '../screens/portfolio/updatePortfolio/addSocialAccounts';
import {
  IPortfolioTabStack,
  PortfolioStackScreenProps
} from '../types/navigation/portfolio';
import PortfolioThemeView from '../screens/PortfolioThemeView';
import UpdateIntroVideo from '../screens/portfolio/updatePortfolio/updateIntroVideo';

const Stack = createNativeStackNavigator<IPortfolioTabStack>();

function CloseModalBtn() {
  const navigation = useNavigation();

  return (
    <Button
      size="xs"
      onPress={() => {
        navigation.goBack();
      }}
    >
      <MaterialCommunityIcons name="close" size={24} color={Black[500]} />
    </Button>
  );
}

function PortfolioStack() {
  const navigation = useNavigation<PortfolioStackScreenProps['navigation']>();
  const route = useRoute<PortfolioStackScreenProps['route']>();

  return (
    <PortfolioDataProvider>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerLeft: props => {
            return (
              <Button
                size="xs"
                onPress={() => {
                  navigation.goBack();
                }}
                btnStyle={{ marginRight: 20 }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color="black"
                />
              </Button>
            );
          }
        }}
      >
        <Stack.Screen
          name="Portfolio"
          component={Portfolio}
          initialParams={{ username: route.params.username }}
        />
        <Stack.Screen
          name="PortfolioTheme"
          component={PortfolioThemeView}
          options={{ headerShown: false }}
        />
        <Stack.Group
          screenOptions={{
            animation: 'slide_from_bottom',
            headerLeft: null,
            headerBackVisible: false,
            headerRight: CloseModalBtn
          }}
        >
          <Stack.Screen
            name="Updatebio"
            component={UpdateBio}
            options={{ title: 'Update Bio' }}
          />
          <Stack.Screen
            name="Addexperience"
            component={AddExperience}
            options={{ title: 'Add Experience' }}
          />
          <Stack.Screen
            name="Addcertificate"
            component={AddCertificate}
            options={{ title: 'Add Certifcate' }}
          />
          <Stack.Screen
            name="Addskill"
            component={AddSkill}
            options={{ title: 'Add Skill' }}
          />
          <Stack.Screen
            name="Addeducation"
            component={AddEducation}
            options={{ title: 'Update Education' }}
          />
          <Stack.Screen
            name="Addblog"
            component={AddBlog}
            options={{ title: 'Add Work' }}
          />
          <Stack.Screen
            name="AddSocialAccounts"
            component={AddSocialAccounts}
          <Stack.Screen
            name="AddIntroVideo"
            component={UpdateIntroVideo}
            options={{ title: 'Add Intro Video' }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </PortfolioDataProvider>
  );
}

export default PortfolioStack;
