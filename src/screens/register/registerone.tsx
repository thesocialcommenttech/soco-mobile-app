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
import TextInputWithLabel from '../../components/textInputWithLabel';
import ButtonWithLoader from '../../components/buttonWithLoader';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { object, string, boolean } from 'yup';
import { CheckBox } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDetails,
  setUserDetails
} from '../../store/reducers/register';
var logo = require('../../assets/images/logos/Untitled.png');

const CustomCheckBox = (props: any) => {
  return (
    <>
      <CheckBox
        checked={props.checked}
        onPress={props.onPress}
        onBlur={props.onBlur}
        title="By sign up you agree to the terms and condition and privacy policy"
        titleProps={{
          style: styles.titleProps
        }}
        containerStyle={styles.checkboxContainer}
        size={18}
        checkedColor="black"
        uncheckedColor="black"
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
    </>
  );
};

const RegisterOneScreen = (
  {
    /* navigation */
  }
) => {
  const dispatch = useDispatch();
  const [isSecure, setIsSecure] = useState(true);
  const state = useSelector(selectUserDetails);

  const onRegister = (
    values: any,
    formikActions: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    dispatch(setUserDetails(values));
    setTimeout(() => {
      formikActions.setSubmitting(false);
      // navigation.navigate('RegisterTwo');
    }, 1000);
  };

  const NextSchema = object().shape({
    email: string()
      .email('Invalid email address')
      .required('Email is Required'),
    password: string().required('Password is Required'),
    name: string().required('Name is Required'),
    userName: string().required('Username is Required'),
    isChecked: boolean().oneOf(
      [true],
      'You must agree to the terms and conditions and privacy policy'
    )
  });

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.register}>Register</Text>
            <Text style={styles.accDet}>Account Details</Text>
            <Formik
              initialValues={state}
              validationSchema={NextSchema}
              onSubmit={onRegister}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
                handleSubmit,
                setFieldValue
              }) => {
                const {
                  email,
                  password,
                  name,
                  userName,
                  referralCode,
                  isChecked
                } = values;
                console.log(values);
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
                      onChangeText={handleChange('referralCode')}
                      value={referralCode}
                      errorTxt={touched.referralCode && errors.referralCode}
                      onBlur={handleBlur('referralCode')}
                    />
                    <View>
                      <CustomCheckBox
                        checked={isChecked}
                        onPress={() => {
                          setFieldValue('isChecked', !isChecked);
                        }}
                        onBlur={handleBlur('isChecked')}
                        errorTxt={touched.isChecked && errors.isChecked}
                      />
                    </View>
                    <ButtonWithLoader
                      text="Next"
                      onPress={handleSubmit}
                      btnStyle={styles.nextBtn}
                      submitting={isSubmitting}
                    />
                  </>
                );
              }}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterOneScreen;

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
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '3%'
  },
  accDet: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16,
    color: '#BDBDBD',
    marginTop: '4%'
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
    marginTop: '-6%'
  },
  usernameTB: {
    marginTop: '-6%'
  },
  emailTB: {
    marginTop: '-6%'
  },
  passTB: {
    marginTop: '-6%'
  },
  refTB: {
    marginTop: '-6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  nextBtn: {
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
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: '#EE0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%'
  }
});
