import {
  Image,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { staticFileSrc } from '~/src/utils/methods';
import Button from '../theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue } from '~/src/utils/colors';

export default function AddWork(props: {
  imageUri: string;
  text: string;
  style?: StyleProp<ViewStyle>;
  onSelectionChange?: (isSelected: boolean) => void;
}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [dim, setDim] = useState<LayoutRectangle>();

  function onItemPressed() {
    setToggleCheckBox(!toggleCheckBox);
    props.onSelectionChange?.(!toggleCheckBox);
  }

  return (
    <View
      style={[props.style, styles.addblogview]}
      onLayout={e => {
        setDim(e.nativeEvent.layout);
      }}
    >
      <TouchableWithoutFeedback onPress={onItemPressed}>
        <View style={styles.blogimageandtextview}>
          <Image
            style={styles.addblogimage}
            source={{
              uri: staticFileSrc(props.imageUri)
            }}
          />
          <Text
            style={[styles.addblogtext, dim && { width: dim.width - 190 }]}
            numberOfLines={2}
            lineBreakMode="middle"
            textBreakStrategy="highQuality"
          >
            {props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Button size="xs" onPress={onItemPressed}>
        <MaterialCommunityIcons
          size={24}
          color={Blue.primary}
          name={
            toggleCheckBox
              ? 'checkbox-marked-outline'
              : 'checkbox-blank-outline'
          }
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  addblogview: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addblogimage: {
    width: 120,
    height: 120 / (16 / 9),
    borderRadius: 8,
    backgroundColor: Black[200]
  },
  addblogtext: {
    color: 'black',
    flexWrap: 'wrap',
    marginHorizontal: 15
  },
  blogimageandtextview: {
    flexDirection: 'row'
  }
});
