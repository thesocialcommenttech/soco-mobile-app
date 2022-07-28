import React from 'react';
import Portfolio from '../screens/portfolio/portfolio';
import ArtWorkDetail from '../screens/postDetails/artWorkDetail';
import SkillVideoDetail from '../screens/postDetails/skillVideoDetail';
import PresentationDetail from '../screens/postDetails/presentationDetail';
import UpdateBio from '../screens/portfolio/updatePortfolio/updateBio';
import AddExperience from '../screens/portfolio/updatePortfolio/addExperience';
import AddCertificate from '../screens/portfolio/updatePortfolio/addCertificate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddSkill from '../screens/portfolio/updatePortfolio/addSkill';
import AddEducation from '../screens/portfolio/updatePortfolio/addEducation';
import AddBlog from '../screens/portfolio/updatePortfolio/addBlog';

const Stack = createNativeStackNavigator();

const PortfolioStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Workdetail"
        component={ArtWorkDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SkillVideo"
        component={SkillVideoDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Presentation"
        component={PresentationDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Updatebio"
        component={UpdateBio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addexperience"
        component={AddExperience}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addcertificate"
        component={AddCertificate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addskill"
        component={AddSkill}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addeducation"
        component={AddEducation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Addblog"
        component={AddBlog}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PortfolioStack;
