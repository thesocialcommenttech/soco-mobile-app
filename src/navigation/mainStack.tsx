import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../utils/colors';
import DiscoverStack from './discoverStack';
import HomeStack from './homeStack';
import PortfolioStack from './portfolioStack';
import ProfileStack from './profileStack';
import SearchScreen from '../screens/search/search';

const MyTab = createBottomTabNavigator();
const MyStack = createNativeStackNavigator();

function AppTabs() {
  return (
    <MyTab.Navigator>
      <MyTab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            marginBottom: '10%',
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            color: Colors.GrayBorder
          },
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: '9%',
            backgroundColor: Colors.BlackTab
          },
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcon
                name="home-outline"
                size={30}
                color={tabinfo.focused ? 'white' : 'gray'}
                style={Styles.homeIcon}
              />
            );
          }
        }}
      />
      <MyTab.Screen
        name="DiscoverTab"
        component={DiscoverStack}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Discover',
          tabBarLabelStyle: {
            marginBottom: '10%',
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            color: Colors.GrayBorder
          },
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: '9%',
            backgroundColor: Colors.BlackTab
          },
          tabBarIcon: tabinfo => {
            return (
              <Ionicon
                name="compass-outline"
                size={30}
                color={tabinfo.focused ? 'white' : 'gray'}
                style={Styles.discoverIcon}
              />
            );
          }
        }}
      />
      <MyTab.Screen
        name="PortfolioTab"
        component={PortfolioStack}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Portfolio',
          tabBarLabelStyle: {
            marginBottom: '10%',
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            color: Colors.GrayBorder
          },
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: '9%',
            backgroundColor: Colors.BlackTab
          },
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcon
                name="account-box-outline"
                size={30}
                color={tabinfo.focused ? 'white' : 'gray'}
                style={Styles.portfolioIcon}
              />
            );
          }
        }}
      />
      <MyTab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            marginBottom: '10%',
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            color: Colors.GrayBorder
          },
          // tabBarActiveBackgroundColor: Colors.GrayBorder,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: '9%',
            backgroundColor: Colors.BlackTab
          },
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcon
                name="account-circle-outline"
                size={30}
                color={tabinfo.focused ? 'white' : 'gray'}
                style={Styles.profileIcon}
              />
            );
          }
        }}
      />
    </MyTab.Navigator>
  );
}

const MainStack = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="App"
          component={AppTabs}
          options={{ headerShown: false }}
        />
        <MyStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false
          }}
        />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

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
