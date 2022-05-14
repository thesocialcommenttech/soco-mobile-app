import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../components/textInputWithLabel';
import ButtonWithLoader from '../../components/buttonWithLoader';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { object, string } from 'yup';
var logo = require('../../assets/images/logos/Untitled.png');

const LoginScreen = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const state: {
    email: string;
    password: string;
  } = {
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
    // Will be replaced with API call to backend to authenticate the given emailid and password
    // dispatch(setUserDetails(values));
    setTimeout(() => {
      formikActions.setSubmitting(false);
      formikActions.resetForm();
    }, 1000);
  };

  const LoginSchema = object().shape({
    email: string()
      .email('Invalid Email address')
      .required('Email is Required'),
    password: string().required('Password is Required')
  });

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const goToRegister = () => {
    navigation.navigate('RegisterOne');
  };

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.login}>Login</Text>
          <Formik
            initialValues={state}
            validationSchema={LoginSchema}
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

          <TouchableOpacity style={styles.fmp} onPress={onForgotPassword}>
            <Text style={styles.forPass}>Forgot my password</Text>
          </TouchableOpacity>
          <View style={styles.txtAcct}>
            <Text style={styles.dontAcc}>Don't have an account? </Text>
            <TouchableOpacity style={styles.txtCr} onPress={goToRegister}>
              <Text style={styles.crAcc}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  fmp: {
    alignSelf: 'flex-start'
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
    marginTop: '-6%'
  },
  passTB: {
    marginTop: '-6%'
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
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtAcct: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtCr: { marginTop: '3%' }
});
