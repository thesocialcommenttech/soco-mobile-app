import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import SideMenu from '../components/SideMenu';
import { IRootReducer } from '../store/reducers';
import { BottomTabStack } from '../types/navigation/bottomBar';
import { Black } from '../utils/colors';
import DiscoverStack from './discoverStack';
import HomeTab from './homeStack';
import PortfolioStack from './portfolioStack';
import ProfileTab from './profileStack';

const BottomTabs = createBottomTabNavigator<BottomTabStack>();

export default function BottomTabBar() {
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  return (
    <>
      <BottomTabs.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabelStyle: {
            marginBottom: '10%',
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            color: Black[600]
          },
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: Black[600],
          tabBarStyle: {
            height: '9%',
            backgroundColor: Black.primary
          }
        }}
      >
        <BottomTabs.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: tabinfo => {
              return (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={30}
                  color={tabinfo.focused ? 'white' : Black[600]}
                  style={Styles.homeIcon}
                />
              );
            }
          }}
        />
        <BottomTabs.Screen
          name="DiscoverTab"
          component={DiscoverStack}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: tabinfo => {
              return (
                <MaterialCommunityIcons
                  name="compass-outline"
                  size={30}
                  color={tabinfo.focused ? 'white' : Black[600]}
                  style={Styles.discoverIcon}
                />
              );
            }
          }}
        />
        <BottomTabs.Screen
          name="PortfolioTab"
          component={PortfolioStack}
          initialParams={{ username: authUser.username }}
          options={{
            tabBarLabel: 'Portfolio',
            tabBarIcon: tabinfo => {
              return (
                <MaterialCommunityIcons
                  name="account-box-outline"
                  size={30}
                  color={tabinfo.focused ? 'white' : Black[600]}
                  style={Styles.portfolioIcon}
                />
              );
            }
          }}
        />
        <BottomTabs.Screen
          name="ProfileTab"
          component={ProfileTab}
          options={{
            tabBarLabel: 'Profile',

            tabBarIcon: tabinfo => {
              return (
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={30}
                  color={tabinfo.focused ? 'white' : Black[600]}
                  style={Styles.profileIcon}
                />
              );
            }
          }}
        />
      </BottomTabs.Navigator>
      <SideMenu />
    </>
  );
}

const Styles = StyleSheet.create({
  homeIcon: {
    marginTop: 5
  },
  discoverIcon: {
    marginTop: 5
  },
  portfolioIcon: {
    marginTop: 5
  },
  profileIcon: {
    marginTop: 5
  }
});
