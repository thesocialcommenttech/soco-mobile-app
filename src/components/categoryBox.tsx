import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, { memo } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Blue, Colors } from '../utils/colors';
import Color from 'color';

export interface CategoryChipProps {
  text: string;
  cancelable?: boolean;
  onCancel?: () => void;
  onPress?: () => void;
  selected?: boolean;
}

function Categorybox(props: CategoryChipProps) {
  return (
    <TouchableHighlight
      underlayColor={
        props.selected
          ? Color(Colors.Secondary).darken(0.1).hex()
          : Color(Colors.LightSecondary).darken(0.05).hex()
      }
      style={[
        styles.container,
        props.selected ? styles.selectedBackgroundstyle : styles.backgroundstyle
      ]}
      onPress={() => {
        props.onPress?.();
      }}
    >
      <>
        <Text
          style={[styles.textstyle, props.selected && styles.selectedTextstyle]}
        >
          {props.text}
        </Text>
        {props.cancelable && (
          <TouchableHighlight
            underlayColor={
              props.selected
                ? Color('white').alpha(0.1).rgb().string()
                : Color(Blue.primary).alpha(0.1).desaturate(0.5).rgb().string()
            }
            onPress={() => {
              props.onCancel?.();
            }}
            style={styles.close}
          >
            <MaterialCommunityIcon
              name="close"
              size={15}
              color={
                props.selected
                  ? 'rgba(255, 255, 255, 0.5)'
                  : Color(Blue.primary).alpha(0.5).rgb().string()
              }
              suppressHighlighting={true}
            />
          </TouchableHighlight>
        )}
      </>
    </TouchableHighlight>
  );
}

export default memo(Categorybox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginBottom: '1.5%',
    margin: 2.5,
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  close: {
    justifyContent: 'center',
    marginLeft: 10,
    padding: 2,
    borderRadius: 100
  },
  textstyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    color: Colors.Secondary
  },
  selectedTextstyle: {
    color: 'white'
  },
  selectedBackgroundstyle: {
    backgroundColor: Colors.Secondary,
    // alignSelf: 'flex-start',
    // padding: '1%',
    // paddingRight: '4%',
    // borderRadius: 10,
    flexDirection: 'row'
  },
  backgroundstyle: {
    backgroundColor: Colors.LightSecondary,
    alignItems: 'center'
    // alignSelf: 'center',
    // padding: '1%',
    // marginLeft: '1.5%'
    // marginBottom: '1%'
  }
});
