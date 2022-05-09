import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import validation from '../../utils/validation';
import { showError } from '../../utils/helperFunction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import { loginAction } from '../../store/actions/auth';

const LoginScreen = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        isSecure: true,
    });
    const isValidData = () => {
        const error = validation({
            email,
            password,
            userName: undefined
        });
        if (error) {
            showError(error);
            return false;
        }
        return true;
    }
    const { isLoading, email, password, isSecure } = state;
    const updateState = (key, value) => {
        setState({ ...state, [key]: value });
    };
    const onLogin = () => {
        const checkValid = isValidData();
        if (checkValid) {
            navigation.navigate('Signup');
        }
        else {
            return;
        }
    };

    const onForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const Eyelick = () => {
        setState({ ...state, isSecure: !isSecure });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logos/Untitled.png')}
                />
                <Text style={styles.login}>Login</Text>

                <TextInputWithLabel
                    placeholder="Enter your Email"
                    label="Email"
                    inputStyle={{
                        marginTop: '14%',
                    }}
                    onChangeText={(value) => updateState('email', value)}
                />

                <TextInputWithLabel
                    placeholder="Enter your Password"
                    label="Password"
                    isSecureTextEntry={isSecure}
                    inputStyle={{
                        marginTop: '8%',
                    }}
                    right={
                        <TextInput.Icon color='#0063ff' name={isSecure ? "eye-outline" : "eye-off-outline"} onPress={Eyelick} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '50%',
                        }} />
                    }
                    onChangeText={(value) => updateState('password', value)}
                />

                <ButtonWithLoader
                    text="Login"
                    onPress={onLogin}
                    btnStyle={{
                        backgroundColor: '#FFCA12',
                        height: 46,
                        borderRadius: 8,
                        marginTop: '12%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
                <TouchableOpacity onPress={onForgotPassword}>
                    <Text style={styles.forPass}>Forgot my password</Text>
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Text style={styles.dontAcc}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity style={{ marginTop: '3%' }} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.crAcc}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
    },
    logo: {
        marginTop: '5%',
        width: '57%',
        resizeMode: 'contain',
    },
    login: {
        fontFamily: 'Roboto-Medium',
        fontSize: 32,
        fontWeight: '500',
        marginBottom: 20,
        color: '#000',
        fontStyle: 'normal',
        lineHeight: 32,
        marginTop: '10%',
    },
    forPass: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 16.41,
        color: '#AFAFBD',
        marginTop: '20%',
    },
    dontAcc: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 16.41,
        color: '#AFAFBD',
        marginTop: '3%',
    },
    crAcc: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 16.41,
        color: '#0063FF',
    }
});

