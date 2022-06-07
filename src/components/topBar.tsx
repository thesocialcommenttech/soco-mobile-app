import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownTopbar from './dropdownTopbar';
import { Colors } from '../utils/colors';
var logo = require('../assets/images/logos/soco-premium.png');

const TopBar = (props: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Ionicon name="search" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcon name="bell-outline" size={22} color="white" />
        </TouchableOpacity>
        <DropdownTopbar label={props} />
      </View>
    </View>
  );
};

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
    marginLeft: '2%',
    width: '39%',
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
