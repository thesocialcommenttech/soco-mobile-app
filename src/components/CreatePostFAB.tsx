import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Yellow } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Button from './theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Bottomsheet, { DropdownOption } from './bottomsheet/Bottomsheet';
import { MainStack, ProfileScreenProps } from '../utils/typings/stack';

function CreatePostFAB() {
  const navigation = useNavigation<ProfileScreenProps['navigation']>();
  const [visible, setVisible] = useState(false);

  function onItemPress(item: keyof MainStack) {
    setVisible(false);
    navigation.navigate(item);
  }

  return (
    <>
      <Button
        type="filled"
        onPress={() => {
          setVisible(!visible);
        }}
        btnStyle={styles.stickyButton}
      >
        <MaterialCommunityIcons name="plus" size={30} color="black" />
      </Button>
      <Bottomsheet visible={visible} onClose={() => setVisible(false)}>
        <DropdownOption
          optionKey="artwork"
          label="Artwork"
          onOptionPress={option => onItemPress('Upload_Artwork')}
        />
        <DropdownOption
          optionKey="skill_video"
          label="Skill Video"
          onOptionPress={option => onItemPress('Upload_SkillVideo')}
        />
        <DropdownOption
          optionKey="presentation"
          label="Presentation"
          onOptionPress={option => onItemPress('Upload_Presentation')}
        />
        <DropdownOption
          optionKey="link"
          label="Link"
          onOptionPress={option => onItemPress('Upload_Link')}
        />
      </Bottomsheet>
    </>
  );
}

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
    backgroundColor: Yellow.primary,
    borderRadius: 250,
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    padding: 0,
    paddingHorizontal: 0,
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

export default CreatePostFAB;
