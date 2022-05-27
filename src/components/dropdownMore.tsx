import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const DropdownMore = () => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownRight, setDropdownRight] = useState(0);
  const [selected, setSelected] = useState('All');
  const data = [
    {
      label: 'Edit',
      value: '1',
      icon: 'pencil'
    },
    {
      label: 'Delete',
      value: '2',
      icon: 'delete-outline'
    }
  ];

  const windowWidth = Dimensions.get('window').width;

  const openDropdown = (): void => {
    DropdownButton.current.measure((fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width);
      // console.log('Component height is: ' + height);
      // console.log('X offset to frame: ' + fx);
      // console.log('Y offset to frame: ' + fy);
      // console.log('X offset to page: ' + px);
      // console.log('Y offset to page: ' + py);
      setDropdownTop(height + py);
      setDropdownRight(windowWidth - px - width);
    });

    setVisible(true);
  };

  const onSelect = (item: { label: string; value: string }) => {
    setSelected(item.label);
    // console.log('Selected', item);
  };

  const renderItem = ({ item }): ReactElement<any, any> => {
    return (
      <View>
        {item.value === '1' && (
          <TouchableOpacity
            style={styles.item3}
            onPress={() => onItemPress(item)}
          >
            <Icon2 name={item.icon} size={20} color="#000" />
            <Text style={styles.buttonText1}>{item.label}</Text>
          </TouchableOpacity>
        )}
        {item.value !== '1' ? (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress(item)}
          >
            <Icon2 name={item.icon} size={20} color="#000" />
            <Text style={styles.buttonText1}>{item.label}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  };
  const onItemPress = (item): void => {
    // setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          visible ? setVisible(false) : openDropdown();
        }}
        ref={DropdownButton}
      >
        <Icon name="more-vert" size={20} color="#7D7987" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={[styles.dropdown, { top: dropdownTop, right: dropdownRight }]}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#7D7987',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginRight: '2%',
    marginLeft: '5%'
  },
  buttonText1: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    marginRight: '2%',
    marginLeft: '5%'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 12,
    zIndex: 999,
    // paddingTop: '8%',
    // paddingBottom: '8%',
    paddingLeft: '8%'
  },
  item: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingBottom: '15%',
    paddingLeft: '5%'
  },
  item3: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingTop: '15%',
    paddingBottom: '15%',
    paddingLeft: '5%'
  },
  avatar: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'white'
  },
  avatar2: {
    backgroundColor: 'white',
    borderColor: 'white'
  },
  avatarTitle: {
    color: 'white'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  pad: {
    height: '5%'
  },
  newView: {
    backgroundColor: '#0063FF',
    borderRadius: 19,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  newText: {
    color: 'white',
    fontSize: 11
  }
});

export default DropdownMore;
