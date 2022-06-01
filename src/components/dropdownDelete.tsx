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

const DropdownDelete = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownRight, setDropdownRight] = useState(0);
  const [selected, setSelected] = useState('All');

  const windowWidth = Dimensions.get('window').width;

  const openDropdown = (): void => {
    DropdownButton.current.measure((fx, fy, width, height, px, py) => {
      setDropdownTop(height + py);
      setDropdownRight(windowWidth - px - width);
    });

    setVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          visible ? setVisible(false) : openDropdown();
        }}
        ref={DropdownButton}
      >
        <Icon name="delete-outline" size={20} color="#BDBDBD" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.dropdown]}>
          <Text style={styles.headerText}>Delete Permanently</Text>
          <Text style={styles.descText}>
            You will not be able to reverse this action. Do you really want to
            delete this post.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setVisible(false);
                // delete from props.trash
                props.onDelete(props.id);
              }}
            >
              <Text style={styles.buttonText}>YES, DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.buttonText1}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    zIndex: 999,
    height: 'auto',
    // paddingTop: '8%',
    // paddingBottom: '8%',
    bottom: 0,
    padding: '8%',
    paddingRight: '5%'
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
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: '#000'
  },
  descText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    color: 'gray',
    marginTop: '5%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '8%'
  },
  button: {
    borderRadius: 6,
    marginRight: '4%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingVertical: '3%',
    width: '45%'
  },
  button1: {
    borderRadius: 6,
    backgroundColor: '#0063FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6%',
    paddingVertical: '3%',
    width: '30%'
  },
  buttonText: {
    color: '#7D7987',
    fontSize: 13,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600'
  },
  buttonText1: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500'
  }
});

export default DropdownDelete;
