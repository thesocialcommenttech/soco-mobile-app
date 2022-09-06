import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SettingTab from '../../../components/settingsComponents/SettingTab';
import TopBar from '../../../components/topBar';
import { useNavigation } from '@react-navigation/native';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';

export default function MainSettingScreen() {
  const navigation = useNavigation();

  return (
    <>
      {/* <TopBar navigation={navigation} /> */}
      <View style={styles.container}>
        {/* <SettingScreenHeader showBackBtn={false} title="Settings" /> */}
        <View style={styles.mainList}>
          <SettingTab
            label="Profile"
            screenKey="Profile"
            icon="account-circle-outline"
          />
          <SettingTab
            label="Password"
            screenKey="Password"
            icon="account-key-outline"
          />
          <SettingTab
            label="Interests"
            screenKey="Interests"
            icon="heart-outline"
          />
          <SettingTab
            label="Referral"
            screenKey="Referral"
            icon="wallet-giftcard"
          />
          <SettingTab
            label="Wallet"
            screenKey="WalletStack"
            icon="wallet-outline"
          />
          <SettingTab
            label="Subscription"
            screenKey="Subscription"
            icon="currency-inr"
          />
          <SettingTab
            label="Notification"
            screenKey="Notification"
            icon="bell-outline"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: '1.5%',
    backgroundColor: 'white'
  },
  heading: {
    marginTop: '5.6%',
    marginLeft: '6%'
  },
  headingtext: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: '#000000',
    fontWeight: '600'
  },
  mainList: {
    // marginTop: '7%'
  }
});
