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

const RenderItem = ({
  key,
  item,
  visible,
  setVisible,
  selected,
  setSelected,
  props
}: {
  key: string;
  item: { label: string; value: string };
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  props: any;
}): ReactElement<any, any> => {
  const onSelect = (Item: { label: string; value: string }) => {
    setSelected(item.label);
    props.setLabel(item.label);
    // console.log('Selected', item);
  };

  const onItemPress = (Item: { label: string; value: string }): void => {
    // setSelected(item);
    onSelect(item);
    setVisible(false);
  };
  return (
    <View>
      {item.value === '1' && (
        <TouchableOpacity
          style={styles.item3}
          onPress={() => onItemPress(item)}
        >
          <Text style={styles.buttonText1}>{item.label}</Text>
        </TouchableOpacity>
      )}
      {item.value !== '1' ? (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
          <Text style={styles.buttonText1}>{item.label}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

interface Props {
  label: any;
  setLabel: any;
}

const DropdownSearch: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [selected, setSelected] = useState('User');
  const data = [
    {
      label: 'User',
      value: '1'
    },
    {
      label: 'Post',
      value: '2'
    }
  ];

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
        setDropdownTop(height + py);
        setDropdownLeft(px);
      }
    );

    setVisible(true);
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
        <Octicon name="chevron-down" size={15} color={'#99969F'} />
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
                props={props}
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
    flexDirection: 'row',
    paddingBottom: '8%',
    paddingLeft: '2%'
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
