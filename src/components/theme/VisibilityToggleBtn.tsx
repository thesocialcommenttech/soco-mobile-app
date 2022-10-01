import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableHighlight,
  ViewStyle
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black } from '~/src/utils/colors';

export default function VisibilityToggleBtn(props: {
  onPress: (event: GestureResponderEvent) => void;
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableHighlight
      underlayColor={Black[200]}
      style={[
        {
          padding: 10,
          marginRight: -15,
          borderRadius: 100
        },
        props.style
      ]}
      onPress={props.onPress}
    >
      <MaterialCommunityIcons
        name={props.isVisible ? 'eye-outline' : 'eye-off-outline'}
        size={24}
      />
    </TouchableHighlight>
  );
}
