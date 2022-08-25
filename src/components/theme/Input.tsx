import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue, Red } from '~/src/utils/colors';
import Bottomsheet, { DropdownOption } from '../bottomsheet/Bottomsheet';
import VisibilityToggleBtn from './VisibilityToggleBtn';

export function InputError({ error }: { error: string }) {
  return <Text style={styles.error}>{error}</Text>;
}

type SelectOption = Record<string, string>;

export type SelectInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  selectOptions: SelectOption;
  onValueChange: (key: string, label: string) => void;
  optionListHeaderTitle?: string;
  style?: StyleProp<ViewStyle>;
};

export function SelectInput({
  label,
  onValueChange,
  placeholder,
  value,
  style,
  selectOptions,
  optionListHeaderTitle
}: SelectInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={[styles.inputCt, style]}>
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
      </View>
      <Bottomsheet visible={open} onClose={() => setOpen(false)}>
        <>
          {optionListHeaderTitle && (
            <Text
              style={{
                marginBottom: 10,
                paddingHorizontal: 20,
                fontSize: 16
              }}
            >
              {optionListHeaderTitle}
            </Text>
          )}
          {Object.entries(selectOptions).map(([optkey, optLabel], i) => (
            <DropdownOption
              key={optkey + i}
              label={optLabel}
              optionKey={optkey}
              onOptionPress={() => {
                onValueChange(optkey, optLabel);
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
  error?: string;
  children?:
    | ReactElement
    | ((props: {
        focused: boolean;
        setFocused: Dispatch<SetStateAction<boolean>>;
        textInputDim: LayoutRectangle;
        style: StyleProp<ViewStyle>;
      }) => ReactElement);
};

export function Input({
  label,
  style,
  inputContainer,
  inputProp,
  prefix,
  suffix,
  error,
  children
}: InputProps) {
  const [textInputDim, setTextInputDim] = useState<LayoutRectangle>();
  const [focused, setFocused] = useState(false);

  return (
    <>
      <View style={[styles.inputCt, !label && { marginTop: 0 }, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.input,
            prefix && { paddingLeft: 25 },
            suffix && { paddingRight: 25 },
            focused && styles.inputFocused,
            error && styles.inputError,
            inputContainer
          ]}
        >
          {prefix}
          {children ? (
            typeof children === 'function' ? (
              children({
                focused,
                setFocused,
                textInputDim,
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
                textInputDim && { width: textInputDim.width },
                inputProp?.style
              ]}
              selectionColor={Blue[50]}
              onLayout={e => {
                setTextInputDim(e.nativeEvent.layout);
              }}
            />
          )}
          {suffix}
        </View>
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
