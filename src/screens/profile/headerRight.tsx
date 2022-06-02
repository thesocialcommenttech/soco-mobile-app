import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const HeaderRight = () => {
  const [visible, setVisible] = useState(false);
  let toggle = () => setVisible(!visible);
  return (
    <>
      <TouchableOpacity style={{ marginTop: 20, marginRight: 8 }}>
        <Feather
          name="more-vertical"
          size={24}
          color="black"
          onPress={toggle}
        />
      </TouchableOpacity>
      <Menu
        visible={visible}
        anchor={<Text onPress={toggle}>Show menu</Text>}
        onRequestClose={toggle}
      >
        <MenuItem onPress={toggle}>Menu item 1</MenuItem>
        <MenuItem onPress={toggle}>Menu item 2</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={toggle}>Menu item 4</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
