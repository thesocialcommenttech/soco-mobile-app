import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import DiscoverStack from './discoverStack';
import HomeStack from './homeStack';
import PortfolioStack from './portfolioStack';
import ProfileStack from './profileStack';

const MyTab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
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
              color: '#DCDCDC'
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: '9%',
              backgroundColor: '#0F1724'
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
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
              color: '#DCDCDC'
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: '9%',
              backgroundColor: '#0F1724'
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon1
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
              color: '#DCDCDC'
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: '9%',
              backgroundColor: '#0F1724'
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
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
              color: '#DCDCDC'
            },
            // tabBarActiveBackgroundColor: '#DCDCDC',
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              height: '9%',
              backgroundColor: '#0F1724'
            },
            tabBarIcon: tabinfo => {
              return (
                <Icon2
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
