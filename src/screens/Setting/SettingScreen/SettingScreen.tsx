import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import SettingTab from '../../../components/settingsComponents/SettingTab';
import TopBar from '../../../components/topBar';
import { useNavigation } from '@react-navigation/native';

const Data = [
  {
    id: 1,
    name: 'Profile',
    icon: require('../../../assets/images/icons/profile.png')
  },
  {
    id: 2,
    name: 'Password',
    icon: require('../../../assets/images/icons/password.png')
  },
  {
    id: 3,
    name: 'Interests',
    icon: require('../../../assets/images/icons/heart.png')
  },
  {
    id: 4,
    name: 'Referral',
    icon: require('../../../assets/images/icons/referal.png')
  },
  {
    id: 5,
    name: 'Wallet',
    icon: require('../../../assets/images/icons/wallet.png')
  },
  {
    id: 6,
    name: 'Subscription',
    icon: require('../../../assets/images/icons/rupee.png')
  },
  {
    id: 7,
    name: 'Notification',
    icon: require('../../../assets/images/icons/notification.png')
  }
];

export default function MainSettingScreen() {
  const [profile] = useState(
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADoAPQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADYQAAIBAwIDBQUFCQAAAAAAAAECAwAEEQUhBhIxIlFhcYETQaGxwRQyM0KRFlNiZJKTstHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwIEAAH/xAAeEQACAgICAwAAAAAAAAAAAAAAAQIREiEDMQRRgf/aAAwDAQACEQMRAD8AsyLf8vbeYr/GOb4NmtETEfgxMT3wAf44psrSfvGrOaU/mX1Wi+ja9CS8Z0nKGGJuUKBh2Q9PHNDEpJ2XtZjn3IVk+fLTDXr6LT7GW9uoY5BEM4xgk9AKK4d1CK+0mO6tYUti4wzEdo/8a8bo5K+hGYLaMg4kt2O4LQuh/Vc11zy45YdR5u4PMrfB9651PWNQ08uuoWRuYT0uB2iPPurNLePVrMzryREMVMchBx6jNcpWVKFdmz9tTmZo4mAU9owlc+qnHwoQ3soODb/0Tj6imSaSoaRlSE5QgNG2N6GbSbv+Y/u5+tVYeJZGYIma3zYQ5rl8Fj3AVqdgFNcUIeJ7eTUbeGzjK4knQPnu3P0z6UYtxHpQjtY7cmEYUcmc/EYPoc0I06Nr9vE8iqscLPuepJAH1rvVOINNtpVikdnwe24QlF8z0oZy2auKKqxpcPAwMTSISy59mx3I8qQ8JaQdON1dCUGK6ctFGPypns59Kla1tdRP26N/aBm5FOduvd7j49RinLskNuW5cIi5wozsO4V3FvZ55GqRIyIw3UHI64odioOASAO41PG3YU4O4zQdw2H2x605lsJkmCyMNskdKhurgBT5UVHphOGlfl8F/wBmpjYW5ideTdhgsdyPGrxIzPH+J7w/tMze0+6gznp02+eaPHEC21rYxiBJWdsSSb55Sfceua3xfwvdi8mvYU50Z8OF6rtvSV3woMg5WRMqpHTyrNKma4OUemXbhO4S4u7tIEMcEb8/L3tuBt44J/SrcDsKpPA0NxDpclxLCyCVlPT8uBirULnmj2O9LCFICc8pbC+bs58KWzSdrc0WZcoCcDakl7K3tNqtIOTLvjIYVyuDseh2qUff9aiWrDB5LVZyeZmSTGOdPeO4g7Glc3DVnNIrXBSQA9BEAT4Z9O6nh/EPnWMB7Q0bhFuxVySSpMhjiVFCooVRsFUYAHdQt3piSAvB2H+BphWzVoNlUuJGiDpJ2XXYjxqu6pqsVrMFkYZI95qx8S7Xu3vRfma8l4sYnVmBJwEFUkTJn//Z'
  );
  const [name] = useState('John Doe');
  const [isPremium] = useState(true);
  const [percentProfile] = useState(75);
  const navigation = useNavigation();
  return (
    <>
      <TopBar
        uri={profile}
        username={name}
        premium={isPremium}
        percentProfile={percentProfile}
        navigation={navigation}
      />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1.5%'
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
    marginTop: '7%'
  }
});
