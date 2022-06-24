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
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { Colors } from '../../utils/colors';
import { login } from '../../utils/services/login_service/login.service';
import { AuthActionTypes, setAuthToLogin } from '../../store/actions/auth';
import { LoginRequestData } from '../../utils/typings/login_interface/login.interface';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '../../store/reducers';
const logo = require('../../assets/images/logos/Untitled.png');

const LoginScreen = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const onLogin = async (
    values: LoginRequestData,
    formikActions: FormikHelpers<LoginRequestData>
  ) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password
      });

      if (response.data?.success) {
        dispatch(
          setAuthToLogin({
            user: response.data.user,
            token: response.data.token
          })
        );
        formikActions.resetForm();
      } else {
        throw new Error(response.data.message.toString());
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'INVALID_PASS') {
        formikActions.setFieldError('password', 'Invalid password');
      } else if (error.message === '"email" must be a valid email') {
        formikActions.setFieldError('email', 'Invalid email');
      } else if (error.message === 'USER_NOT_FOUND') {
        formikActions.setFieldError('password', 'Incorrect email/Password');
        formikActions.setFieldError('email', ' ');
      }
    }

    formikActions.setSubmitting(false);
  };

  const formik = useFormik<LoginRequestData>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: object({
      email: string()
        .trim()
        .email('Invalid Email address')
        .required('Email is Required'),
      password: string().trim().required('Password is Required')
    }),
    onSubmit: onLogin
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
          <TextInputWithLabel
            placeholder="Emaill"
            label="Email"
            inputStyle={styles.emailTB}
            onChangeText={formik.handleChange('email')}
            value={formik.values.email}
            errorTxt={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur('email')}
          />

          <TextInputWithLabel
            placeholder="Password"
            label="Password"
            isSecureTextEntry={isSecure}
            onBlur={formik.handleBlur('password')}
            inputStyle={styles.passTB}
            errorTxt={formik.touched.password && formik.errors.password}
            right={
              <TextInput.Icon
                color={Colors.Secondary}
                name={isSecure ? 'eye-outline' : 'eye-off-outline'}
                onPress={Eyelick}
                style={styles.eye}
              />
            }
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
          />
          <ButtonWithLoader
            text="Login"
            onPress={formik.handleSubmit}
            btnStyle={styles.loginBtn}
            submitting={formik.isSubmitting}
          />
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
    backgroundColor: Colors.White
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
    color: Colors.Black,
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '10%'
  },
  fmp: {
    alignSelf: 'flex-start'
  },
  forPass: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: Colors.LightGray,
    marginTop: '20%'
  },
  dontAcc: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: Colors.LightGray,
    marginTop: '3%'
  },
  crAcc: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: Colors.Secondary
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
    backgroundColor: Colors.Primary,
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
