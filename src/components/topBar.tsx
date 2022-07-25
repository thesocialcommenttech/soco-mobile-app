import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownTopbar from './dropdownTopbar';
import { Colors } from '../utils/colors';
import logo from '../assets/images/logos/thesocialcomment-logo.png';
import Textlogo from '../assets/images/logos/soco-premium.png';
import { getUserData2 } from '../utils/services/user-profile_service/getUserData2.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '../store/reducers';

function TopBar(props: any) {
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [premium, setPremium] = useState(false);

  async function fetchUserData() {
    try {
      const result = await getUserData2(auth.user.username, 'premium');

      if (result.data.success) {
        setPremium(result.data.user.premium);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {premium ? (
        <Image style={styles.textLogo} source={Textlogo} />
      ) : (
        <Image style={styles.logo} source={logo} />
      )}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Search');
          }}
        >
          <Ionicon name="search" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
        >
          <MaterialCommunityIcon name="bell-outline" size={22} color="white" />
        </TouchableOpacity>
        <DropdownTopbar label={props} />
      </View>
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 60,
    flexDirection: 'row',
    backgroundColor: Colors.BlackTab,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  logo: {
    marginLeft: 15,
    width: 30,
    resizeMode: 'contain'
  },
  textLogo: {
    marginLeft: 8,
    width: 130,
    resizeMode: 'contain'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%',
    marginRight: '2%'
  },
  avatar: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'white'
  },
  avatarTitle: {
    color: 'white'
  },
  closeBtn: {
    textAlign: 'right',
    color: Colors.Secondary
  }
});
