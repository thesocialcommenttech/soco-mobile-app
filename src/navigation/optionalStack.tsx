import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import BioScreen from '../screens/bio/bio';
import CategoriesScreen from '../screens/categories/categories';
import CoverPictureScreen from '../screens/coverPicture/coverPicture';

import ProfilePictureScreen from '../screens/profilePicture/profilePicture';
import { AuthActionTypes, setAuthToLogin } from '../store/actions/auth';
import { IRootReducer } from '../store/reducers';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

const Header = ({ index }) => {
  console.log('OptionalStack');
  return <></>;
};

const OptionalStack = ({ navigation, route }) => {
  React.useEffect(() => {
    console.log('dg', route.params);
  }, [route.params]);

  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={() => ({
          gestureDirection: 'horizontal',
          headerShown: false,
          headerBackground: () => (
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setAuthToLogin({
                      user: route.params.user,
                      token: route.params.token
                    })
                  );
                }}
              >
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
        options={() => ({
          headerShown: false,
          headerBackground: () => (
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setAuthToLogin({
                      user: route.params.user,
                      token: route.params.token
                    })
                  );
                }}
              >
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
        options={() => ({
          headerShown: false,
          headerBackground: () => (
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setAuthToLogin({
                      user: route.params.user,
                      token: route.params.token
                    })
                  );
                }}
              >
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
        options={() => ({
          headerShown: false,
          headerBackground: () => (
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setAuthToLogin({
                      user: route.params.user,
                      token: route.params.token
                    })
                  );
                }}
              >
                <Text style={styles.skipTxt}>SKIP</Text>
              </TouchableOpacity>
              <View style={styles.dotsView}>
                <View style={styles.dotsY} />
                <View style={styles.dotsY} />
                <View style={styles.dotsY} />
                <View style={styles.dotsY} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setAuthToLogin({
                      user: route.params.user,
                      token: route.params.token
                    })
                  );
                }}
              >
                <Text style={styles.nextTxt}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      />
    </Stack.Navigator>
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
