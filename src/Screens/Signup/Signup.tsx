import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import validation from '../../utils/validation';
import { showError } from '../../utils/helperFunction';

const SignUpScreen = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        userName: '',
        email: '',
        password: '',
        isSecure: true,
    });
    const isValidData = () => {
        const error = validation({
            userName,
            email,
            password,
        });
        if (error) {
            showError(error);
            return false;
        }
        return true;
    }
    const { isLoading, userName, email, password, isSecure } = state;
    const updateState = (key, value) => {
        setState({ ...state, [key]: value });
    };
    const onSignUp = () => {
        const checkValid = isValidData();
        if (checkValid) {
            navigation.navigate('Signup');
        }
        else {
            return;
        }
    };
    return (
        <View style={styles.container}>
            <TextInputWithLabel
                placeholder="Enter your Username"
                label="UserName"
                onChangeText={(value) => updateState('userName', value)}
            />
            <TextInputWithLabel
                placeholder="Enter your Email"
                label="Email"
                onChangeText={(value) => updateState('email', value)}
            />
            <TextInputWithLabel
                placeholder="Enter your Password"
                label="Password"
                isSecureTextEntry={isSecure}
                onChangeText={(value) => updateState('password', value)}
            />
            <ButtonWithLoader
                text="SignUp"
                onPress={onSignUp} btnStyle={undefined} />
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});

