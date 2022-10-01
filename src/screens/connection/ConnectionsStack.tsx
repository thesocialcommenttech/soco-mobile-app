import { StyleSheet } from 'react-native';
import React from 'react';
import { Black, Blue, Colors } from '../../utils/colors';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Connections from './Connections';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { IConnectionTabStack } from '~/src/types/navigation/connections';
import { ConnectionStackScreenProps } from '~/src/types/navigation/profile';

const ConnectionTabStack = createMaterialTopTabNavigator<IConnectionTabStack>();

export default function ConnectionsStack() {
  const navigation = useNavigation<ConnectionStackScreenProps['navigation']>();
  const route = useRoute<ConnectionStackScreenProps['route']>();

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ConnectionTabStack.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
            textTransform: 'capitalize',
            fontFamily: 'Roboto-Medium'
          },
          tabBarStyle: { elevation: 2 },
          tabBarActiveTintColor: Blue.primary,
          tabBarInactiveTintColor: Black[500],
          tabBarIndicatorStyle: {
            backgroundColor: Blue.primary,
            height: 1.5
          }
        }}
      >
        <ConnectionTabStack.Screen
          name="Followers"
          component={Connections}
          getId={({ params }) => params.userId}
          initialParams={route.params.params}
        />
        <ConnectionTabStack.Screen
          name="Followings"
          component={Connections}
          getId={({ params }) => params.userId}
          initialParams={route.params.params}
        />
      </ConnectionTabStack.Navigator>
    </ScreenWithTopBar>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  selectab: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '7%',
    marginLeft: '7%',

    padding: '3%'
  },
  active: {
    color: Colors.Secondary
  },
  inactive: {},
  following: {
    marginRight: '4%'
  }
});
