import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const state = {
    isLoading: false,
    userName: '',
    email: '',
    password: ''
  };

  const onLogin = (
    values: any,
    formikActions: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    console.log(values);
    setTimeout(() => {
      formikActions.setSubmitting(false);
      formikActions.resetForm();
    }, 1000);
  };

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logos/Untitled.png')}
        />
        <Text style={styles.login}>Login</Text>

        <Formik
          initialValues={state}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Invalid Email address')
              .required('Email is Required'),
            password: Yup.string().required('Password is Required')
          })}
          onSubmit={onLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit
          }) => {
            const { email, password } = values;
            // console.log(email, password);
            return (
              <>
                <TextInputWithLabel
                  placeholder="Email"
                  label="Email"
                  inputStyle={styles.emailTB}
                  onChangeText={handleChange('email')}
                  value={email}
                  errorTxt={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                />

                <TextInputWithLabel
                  placeholder="Password"
                  label="Password"
                  isSecureTextEntry={isSecure}
                  onBlur={handleBlur('password')}
                  inputStyle={styles.passTB}
                  errorTxt={touched.password && errors.password}
                  right={
                    <TextInput.Icon
                      color="#0063ff"
                      name={isSecure ? 'eye-outline' : 'eye-off-outline'}
                      onPress={Eyelick}
                      style={styles.eye}
                    />
                  }
                  value={password}
                  onChangeText={handleChange('password')}
                />
                <ButtonWithLoader
                  text="Login"
                  onPress={handleSubmit}
                  btnStyle={styles.loginBtn}
                  submitting={isSubmitting}
                />
              </>
            );
          }}
        </Formik>

        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forPass}>Forgot my password</Text>
        </TouchableOpacity>
        <View style={styles.txtAcct}>
          <Text style={styles.dontAcc}>Don't have an account? </Text>
          <TouchableOpacity
            style={styles.txtCr}
            onPress={() => navigation.navigate('Register')}
          >
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
    backgroundColor: '#fff'
  },
  logo: {
    marginTop: '5%',
    width: '57%',
    resizeMode: 'contain'
  },
  login: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '10%'
  },
  forPass: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD',
    marginTop: '20%'
  },
  dontAcc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD',
    marginTop: '3%'
  },
  crAcc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#0063FF'
  },
  emailTB: {
    marginTop: '8%'
  },
  passTB: {
    marginTop: '8%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  loginBtn: {
    backgroundColor: '#FFCA12',
    height: 46,
    borderRadius: 8,
    marginTop: '12%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtAcct: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtCr: { marginTop: '3%' }
});
