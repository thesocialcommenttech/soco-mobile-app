import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from '@rneui/base';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
var logo = require('../assets/images/logos/soco-premium.png');

const TopBar = props => {
  const [visible, setVisible] = useState(false);
  let toggle = () => setVisible(!visible);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Icon name="search" size={21} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon1 name="bell-outline" size={22} color="white" />
        </TouchableOpacity>

        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity>
              <Avatar
                size={30}
                rounded
                title={props.username?.charAt(0)}
                titleStyle={styles.avatarTitle}
                source={{
                  //   // uri: props.uri
                  uri: props.uri
                }}
                // onPress={() => console.log('Works!')}
                activeOpacity={0.7}
                containerStyle={styles.avatar}
                onPress={toggle}
              />
            </TouchableOpacity>
          }
          onRequestClose={toggle}
        >
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
          >
            <Icon1
              name="close"
              size={24}
              color="black"
              style={styles.closeBtn}
            />
          </TouchableOpacity>
          <MenuItem onPress={toggle}>Menu item 1</MenuItem>
          <MenuItem onPress={toggle}>Menu item 2</MenuItem>
          <MenuItem disabled>Disabled item</MenuItem>
          <MenuDivider />
          <MenuItem onPress={toggle}>Menu item 4</MenuItem>
        </Menu>
      </View>
      {/* <Text>Left</Text>
      <Text>TopBar</Text>
      <Text>Right</Text> */}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: '8%',
    flexDirection: 'row',
    backgroundColor: '#0F1724',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  logo: {
    // marginTop: '5%',
    // width: '57%',
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
    marginRight: '4%',
    marginTop: '4%',
    color: '#0063FF'
  }
});
