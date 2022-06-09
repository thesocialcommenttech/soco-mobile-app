import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BioScreen from '../screens/bio/bio';
import CategoriesScreen from '../screens/categories/categories';
import CoverPictureScreen from '../screens/coverPicture/coverPicture';
import ForgotPasswordScreen from '../screens/login/forgotPassword';

import LoginScreen from '../screens/login/login';
import ProfilePictureScreen from '../screens/profilePicture/profilePicture';
import RegisterOneScreen from '../screens/register/registerone';
import RegisterTwoScreen from '../screens/register/registertwo';
import { setAuth } from '../store/reducers/info';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

const Header = ({ index }) => {
  console.log('OptionalStack');
  return <></>;
};

const OptionalStack = () => {
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={({ navigation }) => ({
            gestureDirection: 'horizontal',
            headerShown: false,
            headerBackground: () => (
              <View style={styles.headerView}>
                <TouchableOpacity onPress={() => dispatch(setAuth(2))}>
                  <Text style={styles.skipTxt}>SKIP</Text>
                </TouchableOpacity>
                <View style={styles.dotsView}>
                  <View style={styles.dotsY} />
                  <View style={styles.dotsG} />
                  <View style={styles.dotsG} />
                  <View style={styles.dotsG} />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfilePicture')}
                >
                  <Text style={styles.nextTxt}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        />
        <Stack.Screen
          name="ProfilePicture"
          component={ProfilePictureScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerBackground: () => (
              <View style={styles.headerView}>
                <TouchableOpacity onPress={() => dispatch(setAuth(2))}>
                  <Text style={styles.skipTxt}>SKIP</Text>
                </TouchableOpacity>
                <View style={styles.dotsView}>
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                  <View style={styles.dotsG} />
                  <View style={styles.dotsG} />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CoverPicture')}
                >
                  <Text style={styles.nextTxt}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        />
        <Stack.Screen
          name="CoverPicture"
          component={CoverPictureScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerBackground: () => (
              <View style={styles.headerView}>
                <TouchableOpacity onPress={() => dispatch(setAuth(2))}>
                  <Text style={styles.skipTxt}>SKIP</Text>
                </TouchableOpacity>
                <View style={styles.dotsView}>
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                  <View style={styles.dotsG} />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BioScreen')}
                >
                  <Text style={styles.nextTxt}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        />
        <Stack.Screen
          name="BioScreen"
          component={BioScreen}
          options={({ navigation }) => ({
            headerShown: false,
            headerBackground: () => (
              <View style={styles.headerView}>
                <TouchableOpacity onPress={() => dispatch(setAuth(2))}>
                  <Text style={styles.skipTxt}>SKIP</Text>
                </TouchableOpacity>
                <View style={styles.dotsView}>
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                  <View style={styles.dotsY} />
                </View>
                <TouchableOpacity onPress={() => dispatch(setAuth(2))}>
                  <Text style={styles.nextTxt}>NEXT</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.White,
    paddingHorizontal: '6%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row'
  },
  skipTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Gray200,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal'
  },
  dotsView: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between'
  },
  dotsG: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.GrayBorder
  },
  dotsY: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: Colors.Primary
  },
  nextTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Secondary,
    fontStyle: 'normal',
    fontFamily: 'Roboto-Medium'
  }
});

export default OptionalStack;
