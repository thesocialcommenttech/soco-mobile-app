import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ButtonWithLoader = ({
    text,
    onPress,
    btnStyle,
}) => {
    return (
        <TouchableOpacity style={btnStyle} onPress={onPress}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ButtonWithLoader;

const styles = StyleSheet.create({
    textStyle: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        fontWeight: '700',
        lineHeight: 16.41,
    }
});
