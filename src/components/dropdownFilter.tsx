import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Colors } from '../utils/colors';
import { PostType } from '../utils/typings/post';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';
import Bottomsheet, { DropdownOption } from './bottomsheet/Bottomsheet';

export type OptionKey = Exclude<PostType, 'link' | 'shared'>;

type DropdownOptionItem = Record<OptionKey, string>;

export const optionsList: DropdownOptionItem = {
  blog: 'Blogs',
  artwork: 'Artworks',
  skill: 'Skill Videos',
  project: 'Projects',
  article: 'Articles',
  presentation: 'Presentations'
};

function DropdownFilter(props: {
  optionKey: OptionKey;
  onOptionChange?: (optionKey: OptionKey) => void;
}) {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [selectedOption, setSelectedOption] = useState(props.optionKey);

  const selectedOptionLabel = useMemo(
    () => optionsList[selectedOption],
    [selectedOption]
  );

  return (
    <>
      {/* Toggle Button */}
      <TouchableHighlight
        underlayColor={Colors.Gray100}
        onPress={() => setVisible(true)}
        ref={DropdownButton}
        style={styles.button}
      >
        <>
          <Text style={styles.buttonText}>{selectedOptionLabel}</Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={16}
            color={Colors.Gray200}
          />
        </>
      </TouchableHighlight>

      {/* BottomSheet */}
      <Bottomsheet visible={visible} onClose={() => setVisible(false)}>
        {Object.keys(optionsList).map((optionKey, i) => (
          <DropdownOption
            key={i + optionKey}
            optionKey={optionKey as OptionKey}
            label={optionsList[optionKey]}
            onOptionPress={(option: OptionKey) => {
              setSelectedOption(option);
              setVisible(false);
              props.onOptionChange?.(option);
            }}
          />
        ))}
      </Bottomsheet>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.Gray600,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '600',
    marginRight: '2%'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    paddingLeft: 13,
    // backgroundColor: Colors.White,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // width: '45%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color(Colors.Gray200).lighten(0.2).hex()
  }
});

export default DropdownFilter;
