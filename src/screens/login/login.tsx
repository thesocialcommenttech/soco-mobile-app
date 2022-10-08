import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { Black, Blue, Yellow } from '../../utils/colors';
import { login } from '../../utils/services/login_service/login.service';
import { AuthActionTypes, setAuthToLogin } from '../../store/actions/auth';
import {
  LoginErrorResponse,
  LoginRequestData
} from '../../utils/typings/login_interface/login.interface';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '../../store/reducers';
import Button from '~/src/components/theme/Button';
import { Input, PasswordInput } from '~/src/components/theme/Input';
import axios from 'axios';
import { Link } from '@react-navigation/native';
import logo from '~/src/assets/images/logos/thesocialcomment-logo.png';

function LoginScreen() {
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
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errRes = error.response.data as LoginErrorResponse;
        if (errRes.message === 'INVALID_PASS') {
          formikActions.setFieldError('password', 'Invalid password');
        } else if (errRes.message === '"email" must be a valid email') {
          formikActions.setFieldError('email', 'Invalid email');
        } else if (errRes.message === 'USER_NOT_FOUND') {
          formikActions.setFieldError('password', 'Incorrect email/Password');
          formikActions.setFieldError('email', undefined);
        }
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

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMethod="resize"
          resizeMode="contain"
          source={logo}
        />
        <Text style={styles.login}>Welcome to thesocialcomment</Text>
        <Input
          label="Email"
          inputProp={{
            placeholder: 'Emaill',
            onChangeText: formik.handleChange('email'),
            value: formik.values.email,
            onBlur: formik.handleBlur('email')
          }}
          error={formik.touched.email && formik.errors.email}
        />
        <PasswordInput
          label="Password"
          style={styles.MT}
          inputProp={{
            placeholder: 'Password',
            onBlur: formik.handleBlur('password'),
            value: formik.values.password,
            onChangeText: formik.handleChange('password')
          }}
          error={formik.touched.password && formik.errors.password}
        />
        <Button
          text="Login"
          fullWidth
          onPress={formik.handleSubmit}
          btnStyle={styles.loginBtn}
          textStyle={{ color: 'black' }}
          disabled={formik.isSubmitting}
          processing={formik.isSubmitting}
        />
        {/* <TouchableOpacity style={styles.fmp} onPress={onForgotPassword}>
            </TouchableOpacity> */}
        <View style={{ alignItems: 'center' }}>
          <Link to={{ screen: 'ForgotPassword' }} style={styles.forPass}>
            Forgot my password
          </Link>
          <Text style={styles.dontAcc}>
            Don't have an account?{' '}
            <Link to={{ screen: 'RegisterOne' }} style={styles.crAcc}>
              Register
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  logo: {
    marginTop: 20,
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  login: {
    // fontFamily: 'Roboto-Medium',
    fontSize: 20,
    marginBottom: 40,
    color: 'black',
    marginTop: 20,
    textAlign: 'center'
    // textTransform: 'uppercase'
  },
  forPass: {
    // fontFamily: 'Roboto-Medium',
    fontSize: 14,
    lineHeight: 16.41,
    marginTop: 50,
    color: Blue.primary
  },
  dontAcc: {
    // fontFamily: 'Roboto-Medium',
    color: Black[600],
    marginTop: 5
  },
  crAcc: {
    // fontFamily: 'Roboto-Medium',
    color: Blue.primary
  },
  MT: {
    marginTop: 27
  },
  loginBtn: {
    backgroundColor: Yellow.primary,
    marginTop: 20
  }
});
