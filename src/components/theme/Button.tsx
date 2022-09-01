import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native';
import React, { ReactElement, useMemo, useState } from 'react';
import { Black, Blue } from '~/src/utils/colors';
import Color from 'color';

interface ButtonDimmension {
  w: number;
  h: number;
}

export type ButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  children?:
    | ReactElement
    | ((props: { btnDim: ButtonDimmension }) => ReactElement);
  textStyle?: StyleProp<TextStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  type?: 'outlined' | 'filled' | 'text';
  disabled?: boolean;
  text?: string;
  size?: 'xs' | 'sm' | 'md' | 'bg';
  fullWidth?: boolean;
  processing?: boolean;
  rounded?: boolean;
};

function Button(props: ButtonProps) {
  const { type: btnType = 'text' } = props;

  const btnTypeStyle = useMemo<ViewStyle>(() => {
    switch (props.type) {
      case 'outlined':
        return styles.btnOutlined;
      case 'filled':
        return styles.btnFilled;
    }
  }, [props.type]);

  const btnTextTypeStyle = useMemo<TextStyle>(() => {
    switch (props.type) {
      case 'filled':
        return { color: 'white', letterSpacing: 0.4 };
      case 'text':
      default:
        return { textTransform: 'uppercase' };
    }
  }, [props.type]);

  const btnSizeStyle = useMemo<ViewStyle>(() => {
    switch (props.size) {
      case 'xs':
        return styles.btnXs;
      case 'sm':
        return styles.btnSm;
    }
  }, [props.size]);

  const btnTextSizeStyle = useMemo<TextStyle>(() => {
    switch (props.size) {
      case 'xs':
        return styles.btnXs_text;
      case 'sm':
        return styles.btnSm_text;
    }
  }, [props.size]);

  const btnHighlight = useMemo<string>(() => {
    switch (props.type) {
      case 'outlined':
        return Color(Blue.primary).lighten(0.95).hex();
      case 'filled':
        return (props.btnStyle as ViewStyle)?.backgroundColor
          ? Color((props.btnStyle as ViewStyle).backgroundColor)
              .darken(0.1)
              .string()
          : Blue['600'];
      case 'text':
      default:
        return Black['100'];
    }
  }, [props.type]);

  const [btnDim, setBtnDim] = useState<ButtonDimmension>({
    w: undefined,
    h: undefined
  });

  const processIndicatorSize = useMemo(() => {
    switch (props.size) {
      case 'sm':
        return 14;
      default:
        return 18;
    }
  }, [props.size]);

  return (
    <TouchableHighlight
      onLayout={e => {
        const layout = e.nativeEvent.layout;
        setBtnDim({ h: layout.height, w: layout.width });
      }}
      disabled={props.disabled}
      underlayColor={btnHighlight}
      onPress={e => props.onPress?.(e)}
      style={[
        styles.btn,
        btnTypeStyle,
        btnSizeStyle,
        !props.fullWidth && styles.btnHugContent,
        props.rounded && { borderRadius: 999 },
        props.disabled &&
          btnType !== 'text' && {
            backgroundColor: Black['200'],
            ...(props.type === 'outlined' && { borderColor: Black['500'] })
          },
        props.btnStyle
      ]}
    >
      <>
        {props.processing && (
          <ActivityIndicator
            size={processIndicatorSize}
            style={processIndicatorStyle({
              btnH: btnDim.h,
              btnW: btnDim.w,
              size: processIndicatorSize
            })}
            color={Black['500']}
          />
        )}
        <View style={[props.processing && { opacity: 0 }]}>
          {props.children ? (
            typeof props.children === 'function' ? (
              props.children({ btnDim })
            ) : (
              props.children
            )
          ) : (
            <Text
              style={[
                styles.btn_text,
                btnTextTypeStyle,
                btnTextSizeStyle,
                props.disabled && btnType !== 'text' && { color: Black['500'] },
                props.textStyle
              ]}
            >
              {props.text}
            </Text>
          )}
        </View>
      </>
    </TouchableHighlight>
  );
}

export default Button;

const processIndicatorStyle = ({ btnW, btnH, size }): ViewStyle => ({
  position: 'absolute',
  ...(btnW && { top: btnH / 2, left: btnW / 2 }),
  transform: [{ translateY: size / -2 }, { translateX: size / -2 }]
});

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnHugContent: { alignSelf: 'flex-start' },
  btnSm: { padding: 10, borderRadius: 6 },
  btnXs: { padding: 5, borderRadius: 4 },
  btnFilled: {
    backgroundColor: Blue.primary,
    paddingHorizontal: 18
  },
  btnOutlined: {
    borderWidth: 1,
    borderColor: Blue.primary
    // backgroundColor: Blue['100']
  },
  btn_text: {
    fontSize: 14,
    color: Blue.primary,
    fontFamily: 'Roboto-Medium',
    // fontWeight: '700',
    // lineHeight: 1,
    // includeFontPadding: false,
    textAlignVertical: 'center'
  },
  btnXs_text: { fontSize: 12 },
  btnSm_text: { fontSize: 13 }
});
