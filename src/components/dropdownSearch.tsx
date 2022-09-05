import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';
import { Colors } from '../utils/colors';
import Bottomsheet, { DropdownOption } from './bottomsheet/Bottomsheet';

interface DropdownItem {
  label: string;
  value: string;
}

const RenderItem = ({
  item,
  onItemPress
}: {
  item: DropdownItem;
  onItemPress: (item: DropdownItem) => void;
}): ReactElement<any, any> => {
  // const onSelect = (Item: { label: string; value: string }) => {
  //   setSelected(item.label);
  //   props.setLabel(item.label);
  //   // console.log('Selected', item);
  // };

  // function onItemPress(): void {
  //   // setSelected(item);
  //   onSelect(item);
  //   setVisible(false);
  // }
  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={styles.buttonText1}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

function DropdownSearch(props: {
  options: DropdownItem[];
  currentSelectionIndex?: number;
  onSelectionChange: (selection: DropdownItem) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.currentSelectionIndex ?? 0
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {props.options[selectedIndex].label}
        </Text>
        <Octicon name="chevron-down" size={15} color={'#99969F'} />
      </TouchableOpacity>
      <Bottomsheet visible={visible} onClose={() => setVisible(false)}>
        {props.options.map((item, i) => {
          return (
            <DropdownOption
              key={item.value}
              label={item.label}
              optionKey={item.value}
              onOptionPress={() => {
                setSelectedIndex(i);
                setVisible(false);
                props.onSelectionChange(item);
              }}
            />
          );
        })}
      </Bottomsheet>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#99969F',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginRight: '2%'
  },
  buttonText1: {
    color: Colors.Black,
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    // width: '100%',
    borderRadius: 12,
    zIndex: 999,
    // height: 'auto',
    // paddingTop: '8%',
    // paddingBottom: '8%',
    paddingVertical: 10,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 10
    // paddingLeft: '8%'
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 13
  },
  item3: {
    // paddingHorizontal: '1%'
    flexDirection: 'row',
    paddingTop: '8%',
    paddingBottom: '8%',
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
    // paddingVertical: '3%',
    // paddingHorizontal: '3%',
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: Colors.Gray600
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

export default DropdownSearch;
