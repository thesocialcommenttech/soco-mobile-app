import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Red, Yellow } from '~/src/utils/colors';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';
import Button, { ButtonProps } from './Button';
import VisibilityToggleBtn from './VisibilityToggleBtn';

export function InputError({ error }: { error: string }) {
  return <Text style={styles.error}>{error}</Text>;
}

type SelectOption = Record<string, string>;

export type SelectInputProps = Omit<InputProps, 'prefix' | 'onPress'> & {
  selectOptions?: SelectOption;
  onValueChange?: (key: string, label: string) => void;
  optionListHeaderTitle?: string;
};

export function SelectInput(props: SelectInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Input
        onPress={() => setOpen(true)}
        suffix={
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={Black[500]}
            style={{ alignSelf: 'center' }}
          />
        }
        {...props}
        inputProp={{ ...props?.inputProp, editable: false }}
      />
      {/* <View style={[styles.inputCt, style]}>
        <Text style={styles.label}>{label}</Text>
        <TouchableHighlight
          underlayColor={Black[100]}
          onPress={() => setOpen(true)}
          style={styles.input}
        >
          <>
            <Text style={[styles.text, !value && styles.textPlaceholder]}>
              {value ? selectOptions[value] : placeholder}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={Black[500]}
              style={{ alignSelf: 'center', padding: 10 }}
            />
          </>
        </TouchableHighlight>
      </View> */}
      <Bottomsheet visible={open} onClose={() => setOpen(false)}>
        <>
          {props.optionListHeaderTitle && (
            <Text
              style={{
                marginBottom: 10,
                paddingHorizontal: 20,
                fontSize: 16
              }}
            >
              {props.optionListHeaderTitle}
            </Text>
          )}
          {Object.entries(props.selectOptions).map(([optkey, optLabel], i) => (
            <DropdownOption
              key={optkey + i}
              label={optLabel}
              optionKey={optkey}
              onOptionPress={() => {
                props.onValueChange?.(optkey, optLabel);
                setOpen(false);
              }}
            />
          ))}
        </>
      </Bottomsheet>
    </>
  );
}

export function PasswordInput(props: Omit<InputProps, 'suffix'>) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <Input
      {...props}
      inputProp={{
        ...props.inputProp,
        secureTextEntry: isSecure,
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: false,
        returnKeyType: 'next'
      }}
      suffix={
        <VisibilityToggleBtn
          isVisible={isSecure}
          onPress={() => setIsSecure(!isSecure)}
        />
      }
    />
  );
}

export type InputProps = {
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputContainer?: StyleProp<ViewStyle>;
  inputProp?: TextInputProps;
  prefix?: ReactElement;
  suffix?: ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
  error?: string;
  children?:
    | ReactElement
    | ((props: {
        focused: boolean;
        setFocused: Dispatch<SetStateAction<boolean>>;
        // textInputDim: LayoutRectangle;
        style: StyleProp<ViewStyle>;
      }) => ReactElement);
};

export function RadioButton(props: {
  selected?: boolean;
  buttonProps?: ButtonProps;
}) {
  return (
    <Button
      {...props.buttonProps}
      btnStyle={[
        props.buttonProps.btnStyle,
        {
          borderColor: Yellow.primary,
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1
        },
        props.selected && {
          backgroundColor: Yellow[100]
        }
      ]}
      textStyle={[
        props.buttonProps.textStyle,
        { color: 'black', fontFamily: 'Roboto', textTransform: 'capitalize' },
        props.selected && { fontFamily: 'Roboto-Medium' }
      ]}
    />
  );
}

export function Input({
  label,
  style,
  inputContainer,
  inputProp,
  prefix,
  suffix,
  error,
  children,
  onPress
}: InputProps) {
  const [textInputDim, setTextInputDim] = useState<LayoutRectangle>();
  const [focused, setFocused] = useState(false);

  return (
    <>
      <View style={[styles.inputCt, !label && { marginTop: 0 }, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TouchableHighlight
          {...(onPress && { onPress: e => onPress?.(e) })}
          underlayColor={Black[100]}
          style={[
            styles.input,
            prefix && { paddingLeft: 25 },
            suffix && { paddingRight: 25 },
            focused && styles.inputFocused,
            error && styles.inputError,
            inputContainer
          ]}
        >
          <>
            {prefix}
            {children ? (
              typeof children === 'function' ? (
                children({
                  focused,
                  setFocused,
                  // textInputDim,
                  style: styles.textView
                })
              ) : (
                children
              )
            ) : (
              <TextInput
                {...inputProp}
                onFocus={e => {
                  inputProp?.onFocus?.(e);
                  setFocused(true);
                }}
                onBlur={e => {
                  inputProp?.onBlur?.(e);
                  setFocused(false);
                }}
                style={[
                  styles.text,
                  styles.textView,
                  !label && { paddingTop: 16 },
                  // textInputDim && { width: textInputDim.width },
                  inputProp?.style
                ]}
                selectionColor={Blue[50]}
                // onLayout={e => {
                //   setTextInputDim(e.nativeEvent.layout);
                // }}
              />
            )}
            {suffix}
          </>
        </TouchableHighlight>
      </View>
      {error && <InputError error={error} />}
    </>
  );
}

const styles = StyleSheet.create({
  inputCt: { marginTop: 10 },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Black[400],
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },
  inputFocused: {
    borderColor: Blue.primary
  },
  inputError: {
    borderColor: Red.primary
  },
  label: {
    position: 'absolute',
    left: 20,
    top: -10,
    zIndex: 999,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: 'black',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    textTransform: 'uppercase'
  },
  textView: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 16 + 2,
    paddingVertical: 16
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto'
  },
  textPlaceholder: { color: Black[600] },
  error: {
    color: Red.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5
  }
});
