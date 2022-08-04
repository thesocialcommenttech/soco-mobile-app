import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon3 from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../utils/colors';
interface Props {
  label: any;
}

const DropdownBottombutton: FC<Props> = props => {
  const navigation = useNavigation();
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
      label: 'Link',
      isNew: true,
      value: '5'
    },
    {
      label: 'Article',
      isNew: true,
      value: '6'
    },
    {
      label: 'Link',
      isNew: false,
      value: '7'
    }
  ];

  const windowHeight = Dimensions.get('window').height;

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        // console.log('Component width is: ' + width);
        // console.log('Component height is: ' + height);
        // console.log('X offset to frame: ' + fx);
        // console.log('Y offset to frame: ' + fy);
        // console.log('X offset to page: ' + px);
        // console.log('Y offset to page: ' + py);
        setDropdownBottom(windowHeight - py);
      }
    );

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
        {item.value !== '1' ? (
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
    navigation.navigate(item.label as never, {} as never);
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
        <Octicon name="plus" size={30} color={Colors.Black} />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <ScrollView style={[styles.dropdown]}>
          {data.map(item => {
            return (
              <RenderItem
                key={item.value}
                item={item}
                visible={visible}
                setVisible={setVisible}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: 'Roboto-Medium'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    zIndex: 999,
    height: 'auto',
    bottom: 0,
    paddingLeft: '8%'
  },
  item: {
    flexDirection: 'row',
    paddingBottom: '8%'
  },
  item1: {
    flexDirection: 'row',
    paddingTop: '8%',
    paddingBottom: '8%'
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
    backgroundColor: Colors.Primary,
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
    backgroundColor: Colors.Secondary,
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
