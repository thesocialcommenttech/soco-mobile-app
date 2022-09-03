import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import React, { useState } from 'react';
import { Black, Blue } from '~/src/utils/colors';

export default function CategoryItem(props: {
  name: string;
  onPress?: (action: 'select' | 'unselect') => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const [active, setActive] = useState(props.selected);

  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      onPress={() => {
        setActive(!active);
        props.onPress?.(props.selected ? 'unselect' : 'select');
      }}
      style={[styles.category, active && styles.category_active, props.style]}
    >
      <Text style={styles.categoryName}>{props.name}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  category: {
    // marginTop: '1%'
    padding: 10,
    borderRadius: 8
  },
  categoryName: {
    color: 'black'
  },
  category_active: {
    backgroundColor: Blue[50],
    borderWidth: 1,
    borderColor: Blue.primary
  }
});
