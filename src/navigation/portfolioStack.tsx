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

function PortfolioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Portfolio" component={Portfolio} />
      <Stack.Screen name="Updatebio" component={UpdateBio} />
      <Stack.Screen name="Addexperience" component={AddExperience} />
      <Stack.Screen name="Addcertificate" component={AddCertificate} />
      <Stack.Screen name="Addskill" component={AddSkill} />
      <Stack.Screen name="Addeducation" component={AddEducation} />
      <Stack.Screen name="Addblog" component={AddBlog} />
    </Stack.Navigator>
  );
}

export default PortfolioStack;
