import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextInputWithLabel = (
    {
        ...props
    }
) => {
    return (
        <View>
            <TextInput
                mode="outlined"
                onChangeText={props.onChangeText}
                secureTextEntry={props.isSecureTextEntry}
                label={<Text style={
                    { ...styles.label }
                }>{props.label.toUpperCase()}</Text>}
                placeholder={props.label}
                style={[styles.input, props.inputStyle]}
                placeholderTextColor="#99969F"
                // underlineColor='transparent'
                underlineColorAndroid={'transparent'}
                outlineColor='#DCDCDC'
                activeOutlineColor='#000'
                right={props.right}
                {...props}
            >
            </TextInput>
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