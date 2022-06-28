import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bio from './bio';
import Experiences from './experiences';
import Certifications from './certifications';
import Educations from './educations';

const Tab = createMaterialTopTabNavigator();

export default function Portfolio() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexrow}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon1 name="arrow-left" size={28} color="black" />
          </TouchableWithoutFeedback>
          <Text style={styles.mheader}>Portfolio</Text>
          <View style={styles.plus}>
            <Icon2 name="pluscircleo" size={25} color="black" />
          </View>
        </View>
        <Tab.Navigator
          initialRouteName="Bio"
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarLabelStyle: { fontSize: 13 },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#BDBDBD',
            tabBarIndicatorStyle: {
              backgroundColor: '#0063FF',
              height: 1.5
            }
          }}
        >
          <Tab.Screen name="Bio" component={Bio} />
          <Tab.Screen name="Experiences" component={Experiences} />
          <Tab.Screen name="Certifications" component={Certifications} />
          <Tab.Screen name="Educations" component={Educations} />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'black'
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '4.5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    marginLeft: '2%',
    marginBottom: '4%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600'
  },
  plus: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '2.5%',
    marginTop: '0.5%'
  }
});
