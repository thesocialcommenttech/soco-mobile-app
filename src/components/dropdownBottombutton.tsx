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
import Icon3 from 'react-native-vector-icons/Octicons';

interface Props {
  label: any;
  // data: Array<{ label: string; value: string }>;
  // onSelect: (item: { label: string; value: string }) => void;
}

const DropdownBottombutton: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownBottom, setDropdownBottom] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const data = [
    {
      label: 'Blog',
      isNew: false,
      value: '1'
    },
    {
      label: 'Artwork',
      isNew: false,
      value: '2'
    },
    {
      label: 'Skill Video',
      isNew: false,
      value: '3'
    },
    {
      label: 'Project',
      isNew: false,
      value: '4'
    },
    {
      label: 'Article',
      isNew: true,
      value: '5'
    },
    {
      label: 'Presentation',
      isNew: false,
      value: '6'
    },
    {
      label: 'Presentation',
      isNew: false,
      value: '7'
    }
  ];

  // const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const openDropdown = (): void => {
    DropdownButton.current.measure((fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width);
      // console.log('Component height is: ' + height);
      // console.log('X offset to frame: ' + fx);
      // console.log('Y offset to frame: ' + fy);
      // console.log('X offset to page: ' + px);
      // console.log('Y offset to page: ' + py);
      setDropdownBottom(windowHeight - py);
    });

    setVisible(true);
  };

  const onSelect = (item: { label: string; value: string }) => {
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
            <Text style={styles.buttonText}>{item.label}</Text>
            {item.isNew && (
              <View style={styles.newView}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        {item.value !== '1' && item.value !== '7' ? (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress(item)}
          >
            <Text style={styles.buttonText}>{item.label}</Text>
            {item.isNew && (
              <View style={styles.newView}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
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
        style={styles.stickyButton}
      >
        <Icon3 name="plus" size={30} color="#000" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.dropdown, { bottom: dropdownBottom }]}>
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
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    marginLeft: '43%',
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
    paddingBottom: '15%'
  },
  item2: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingBottom: '25%'
  },
  item3: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingTop: '15%',
    paddingBottom: '15%'
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
  stickyButton: {
    position: 'absolute',
    backgroundColor: '#FFCA12',
    borderRadius: 250,
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 5
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

export default DropdownBottombutton;
