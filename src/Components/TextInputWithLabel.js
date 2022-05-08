import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextInputWithLabel = (
    {
        label,
        value,
        onChangeText,
        placeholder,
        textStyle,
        isSecureTextEntry,
        inputStyle,
        right,
        ...props
    }
) => {
    return (
        <View>
            {/* <Text style={styles.label}>{label}</Text> */}
            <TextInput
                mode="outlined"
                onChangeText={onChangeText}
                secureTextEntry={isSecureTextEntry}
                label={<Text style={
                    { ...styles.label }
                }>{label.toUpperCase()}</Text>}
                placeholder={label}
                style={[styles.input, inputStyle]}
                placeholderTextColor="#99969F"
                // underlineColor='transparent'
                underlineColorAndroid={'transparent'}
                outlineColor='#DCDCDC'
                activeOutlineColor='#000'
                right={right}
                {...props}

            >
            </TextInput>
            {/* {isSecureTextEntry?<TouchableOpacity onPress={props.Eyelick}>
                <Icon
                    name={props.showIcon}
                    size={props.showIconSize}
                    color={props.showIconColor}
                />
            </TouchableOpacity>:<></>} */}

        </View>
    );
};


const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
        fontWeight: '900',
        lineHeight: 14,
        fontStyle: 'normal',
    },
    input: {
        width: '100%',
        height: 51,
        color: '#000',
        paddingHorizontal: 16,
        fontFamily: 'Roboto-Regular',
        backgroundColor: '#fff',
    }
});

export default TextInputWithLabel;