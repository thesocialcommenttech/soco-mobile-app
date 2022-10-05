import { StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bio from './bio';
import Experiences from './experiences';
import Certifications from './certifications';
import Educations from './educations';
import Skills from './skills';
import Works from './works';
import { getPortforlioProfileData } from '~/src/utils/services/user-portfolio_services/getPortforlioProfileData.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import Loading from '~/src/components/theme/Loading';
import { getPortforlioWorkData } from '~/src/utils/services/user-portfolio_services/getPortforlioWorkData.service';
import { usePortfolioData } from '~/src/contexts/portfolio.context';
import { Black, Blue } from '~/src/utils/colors';
import { PortfolioTab_ScreenProps } from '~/src/types/navigation/bottomBar';
import { PortfolioStack } from '~/src/types/navigation/portfolio';

const Tab = createMaterialTopTabNavigator<PortfolioStack>();

export default function Portfolio() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  const route = useRoute<PortfolioTab_ScreenProps['route']>();
  const { portfolio, profile, setPortfolio, setProfile } = usePortfolioData();
  const [loading, setLoading] = useState(true);

  const mine = useMemo(
    () => authUser?.username === route.params?.username,
    [authUser, route.params]
  );

  const initialParams = useMemo(
    () => ({
      username: authUser.username,
      mine: mine
    }),
    [authUser, mine]
  );

  const isWorkAdded = useMemo(() => {
    return (
      typeof portfolio?.work !== 'undefined' &&
      Object.values(portfolio?.work).reduce((p, c) => p || c.length > 0, false)
    );
  }, [portfolio?.work]);

  async function fetchData() {
    setLoading(true);
    const [profileResult, portfolioResult] = await Promise.all([
      getPortforlioProfileData(route.params.username),
      getPortforlioWorkData(route.params.username)
    ]);

    if (profileResult.data.success && portfolioResult.data.success) {
      setProfile(profileResult.data.data);
      setPortfolio(portfolioResult.data.data);
    }

    setLoading(false);
  }

  useFocusEffect(() => {
    if (!profile && !portfolio) {
      fetchData();
    }
  });

  if (loading) {
    return <Loading />;
  }

  // if (!profile.premium) {
  //   return (
  //     <ImageBackground
  //       source={bluredPortfolioSS}
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center'
  //       }}
  //       imageStyle={{ opacity: 0.5 }}
  //       resizeMode="stretch"
  //     >
  //       <Button
  //         onPress={() => {}}
  //         text="Get Premium"
  //         type="filled"
  //         btnStyle={{
  //           alignSelf: 'center',
  //           elevation: 10,
  //           minWidth: '50%',
  //           backgroundColor: Yellow.primary
  //         }}
  //         textStyle={{ color: 'black' }}
  //       />
  //     </ImageBackground>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Bio"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarPressColor: Black[200],
          tabBarLabelStyle: { fontSize: 14, textTransform: 'capitalize' },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: Black[500],
          tabBarStyle: { elevation: 1 },
          tabBarIndicatorStyle: {
            backgroundColor: Blue.primary,
            height: 1.5
          }
        }}
      >
        <Tab.Screen name="Bio" initialParams={initialParams} component={Bio} />
        <Tab.Screen
          name="Experiences"
          initialParams={initialParams}
          component={Experiences}
        />
        {(mine || portfolio?.certifications?.length > 0) && (
          <Tab.Screen
            name="Certifications"
            initialParams={initialParams}
            component={Certifications}
          />
        )}
        <Tab.Screen
          name="Educations"
          initialParams={initialParams}
          component={Educations}
        />
        <Tab.Screen
          name="Skills"
          initialParams={initialParams}
          component={Skills}
        />
        {(mine || isWorkAdded > 0) && (
          <Tab.Screen
            name="Works"
            initialParams={initialParams}
            component={Works}
          />
        )}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
