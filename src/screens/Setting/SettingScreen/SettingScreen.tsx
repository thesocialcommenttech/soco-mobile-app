import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import SettingTab from '../../../components/settingsComponents/SettingTab';

const Data = [
  {
    id: 1,
    title: 'Profile',
    name: 'user-o'
  },
  {
    id: 2,
    title: 'Password',
    name: 'key'
  },
  {
    id: 3,
    title: 'Interests',
    name: 'heart-o'
  },
  {
    id: 4,
    title: 'Referral',
    name: 'gift'
  },
  {
    id: 5,
    title: 'Wallet',
    name: 'wallet-outline'
  },
  {
    id: 6,
    title: 'Subscription',
    name: 'rupee'
  },
  {
    id: 7,
    title: 'Notification',
    name: 'bell-o'
  }
];

export default function mainSettingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingtext}>Settings</Text>
      </View>
      <View style={styles.mainList}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SettingTab title={item.title} name={item.name} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1.5%'
  },
  heading: {
    marginTop: '2%',
    marginLeft: '2.5%'
  },
  headingtext: {
    fontSize: 22,
    fontFamily: 'Roboto-medium',
    color: 'black'
  },
  mainList: {
    marginTop: '7%'
  }
});
