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
  setLabel: any;
  // data: Array<{ label: string; value: string }>;
  // onSelect: (item: { label: string; value: string }) => void;
}

const DropdownFilter: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [selected, setSelected] = useState('All');
  const data = [
    {
      label: 'All',
      isNew: false,
      value: '1'
    },
    {
      label: 'Blogs',
      isNew: false,
      value: '2'
    },
    {
      label: 'Artworks',
      isNew: false,
      value: '3'
    },
    {
      label: 'Skill Videos',
      isNew: false,
      value: '4'
    },
    {
      label: 'Projects',
      isNew: false,
      value: '5'
    },
    {
      label: 'Articles',
      isNew: false,
      value: '6'
    },
    {
      label: 'Presentations',
      isNew: false,
      value: '7'
    }
  ];

  // const windowWidth = Dimensions.get('window').width;

  const openDropdown = (): void => {
    DropdownButton.current.measure((fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width);
      // console.log('Component height is: ' + height);
      // console.log('X offset to frame: ' + fx);
      // console.log('Y offset to frame: ' + fy);
      // console.log('X offset to page: ' + px);
      // console.log('Y offset to page: ' + py);
      setDropdownTop(height + py);
      setDropdownLeft(px);
    });

    setVisible(true);
  };

  const onSelect = (item: { label: string; value: string }) => {
    setSelected(item.label);
    props.setLabel(item.label);
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
            <Text style={styles.buttonText1}>{item.label}</Text>
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
            <Text style={styles.buttonText1}>{item.label}</Text>
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
        style={styles.button}
      >
        <Text style={styles.buttonText}>{selected}</Text>
        <Icon3 name="chevron-down" size={20} color="#7D7987" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.dropdown]}>
          {data.map(item => renderItem({ item }))}
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
    marginRight: '2%'
  },
  buttonText1: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    marginRight: '2%'
  },
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
    paddingLeft: '8%'
  },
  item: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingBottom: '10%',
    paddingLeft: '2%'
  },
  item3: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '2%'
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
  button: {
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '45%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7D7987'
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

export default DropdownFilter;
