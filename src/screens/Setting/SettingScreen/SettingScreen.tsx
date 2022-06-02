import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import SettingTab from '../../../components/settingsComponents/SettingTab';

const Data = [
  {
    id: 1,
    name: 'Profile',
    icon: 'user-o'
  },
  {
    id: 2,
    name: 'Password',
    icon: 'key'
  },
  {
    id: 3,
    name: 'Interests',
    icon: 'heart-o'
  },
  {
    id: 4,
    name: 'Referral',
    icon: 'gift'
  },
  {
    id: 5,
    name: 'Wallet',
    icon: 'wallet-outline'
  },
  {
    id: 6,
    name: 'Subscription',
    icon: 'rupee'
  },
  {
    id: 7,
    name: 'Notification',
    icon: 'bell-o'
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
            <SettingTab name={item.name} icon={item.icon} />
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
