import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from '@rneui/base';

const RegisterScreen = (
  {
    /* navigation */
  }
) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const state = {
    isLoading: false,
    name: '',
    userName: '',
    email: '',
    password: '',
    referralCode: ''
  };

  const onRegister = () => {
    // const checkValid = isValidData();
    // if (checkValid) {
    //     navigation.navigate('Signup');
    // }
    // else {
    //     return;
    // }
  };

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/logos/Untitled.png')}
            />
            <Text style={styles.login}>Register</Text>

            <Formik
              initialValues={state}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('Email is Required'),
                password: Yup.string().required('Password is Required'),
                name: Yup.string().required('Name is Required'),
                userName: Yup.string().required('UserName is Required'),
                referralCode: Yup.string().required('ReferralCode is Required')
              })}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => {
                const { email, password, name, userName, referralCode } =
                  values;
                console.log(email, password, name, userName, referralCode);
                return (
                  <>
                    <TextInputWithLabel
                      placeholder="Name"
                      label="Name"
                      inputStyle={styles.nameTB}
                      onChangeText={handleChange('name')}
                      value={name}
                      errorTxt={touched.name && errors.name}
                      onBlur={handleBlur('name')}
                    />
                    <TextInputWithLabel
                      placeholder="Username"
                      label="Username"
                      inputStyle={styles.usernameTB}
                      onChangeText={handleChange('userName')}
                      value={userName}
                      errorTxt={touched.userName && errors.userName}
                      onBlur={handleBlur('userName')}
                    />
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
                      inputStyle={styles.passTB}
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
                      errorTxt={touched.password && errors.password}
                      onBlur={handleBlur('password')}
                    />
                    <TextInputWithLabel
                      placeholder="Referral (Optional)"
                      label="Referral (Optional)"
                      inputStyle={styles.refTB}
                      onChangeText={handleChange('email')}
                      value={referralCode}
                      errorTxt={touched.referralCode && errors.referralCode}
                      onBlur={handleBlur('referralCode')}
                    />
                    <View>
                      <CheckBox
                        checked={isChecked}
                        onPress={() => setIsChecked(!isChecked)}
                        title="By sign up you agree to the terms and condition and privacy policy"
                        titleProps={{
                          style: styles.titleProps
                        }}
                        // textStyle={styles.checkbox}
                        containerStyle={styles.checkboxContainer}
                        // checkedIcon="check-box"
                        // uncheckedIcon="check-box-outline-blank"
                        size={18}
                        checkedColor="black"
                        uncheckedColor="black"
                      />
                      {/* <Text style={styles.checkboxText}>I agree to the </Text> */}
                    </View>
                  </>
                );
              }}
            </Formik>

            <ButtonWithLoader
              text="Register"
              onPress={onRegister}
              btnStyle={styles.registerBtn}
              submitting={undefined}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
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
  nameTB: {
    marginTop: '8%'
  },
  usernameTB: {
    marginTop: '8%'
  },
  emailTB: {
    marginTop: '8%'
  },
  passTB: {
    marginTop: '8%'
  },
  refTB: {
    marginTop: '8%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  registerBtn: {
    backgroundColor: '#FFCA12',
    height: 46,
    borderRadius: 8,
    marginTop: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '2%'
  },
  txtAcct: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtCr: { marginTop: '3%' },
  checkbox: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD'
  },
  checkboxContainer: {
    marginTop: '3%'
  },
  titleProps: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 21,
    color: 'black',
    marginLeft: '5%'
  }
});
