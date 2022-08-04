import React from 'react';
import Portfolio from '../screens/portfolio/portfolio';
import ArtWorkDetail from '../screens/portfolio/artWorkDetail';
import SkillVideoDetail from '../screens/portfolio/skillVideoDetail';
import PresentationDetail from '../screens/portfolio/presentationDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
    </Stack.Navigator>
  );
};

export default PortfolioStack;
