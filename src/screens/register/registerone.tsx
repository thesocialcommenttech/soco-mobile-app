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
import { FormikHelpers, useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import { CheckBox } from '@rneui/base';
import { Colors } from '../../utils/colors';
import { RegisterRequest } from '../../utils/typings/register_interface/register.interface';
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

const RegisterOneScreen = ({ navigation }) => {
  const [isSecure, setIsSecure] = useState(true);
  const state: RegisterReqeust = {
    name: null,
    username: null,
    email: null,
    password: null,
    academic: null,
    agreement: false,
    dob: null,
    gender: null,
    city: null,
    pincode: null,
    referal: null,
    state: null
  };

  const onNext = (
    values: RegisterRequest,
    formikActions: FormikHelpers<RegisterRequest>
  ) => {
    const payload = {
      ...values
    };
    formikActions.setSubmitting(false);
    navigation.navigate('RegisterTwo', payload);
  };

  const NextSchema = object().shape({
    email: string()
      .email('Invalid email address')
      .required('Email is Required'),
    password: string().required('Password is Required'),
    name: string().required('Name is Required'),
    username: string().required('Username is Required'),
    agreement: boolean().oneOf(
      [true],
      'You must agree to the terms and conditions and privacy policy'
    )
  });

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  const formik = useFormik({
    initialValues: state,
    validationSchema: NextSchema,
    onSubmit: onNext
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.register}>Register</Text>
            <Text style={styles.accDet}>Account Details</Text>
            <TextInputWithLabel
              placeholder="Name"
              label="Name"
              inputStyle={styles.nameTB}
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
              errorTxt={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur('name')}
            />
            <TextInputWithLabel
              placeholder="Username"
              label="Username"
              inputStyle={styles.usernameTB}
              onChangeText={formik.handleChange('username')}
              value={formik.values.username}
              errorTxt={formik.touched.username && formik.errors.username}
              onBlur={formik.handleBlur('username')}
            />
            <TextInputWithLabel
              placeholder="Email"
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
              inputStyle={styles.passTB}
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
              errorTxt={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur('password')}
            />
            <TextInputWithLabel
              placeholder="Referral (Optional)"
              label="Referral (Optional)"
              inputStyle={styles.refTB}
              onChangeText={formik.handleChange('referal')}
              value={formik.values.referal}
              errorTxt={formik.touched.referal && formik.errors.referal}
              onBlur={formik.handleBlur('referal')}
            />
            <View>
              <CustomCheckBox
                checked={formik.values.agreement}
                onPress={() => {
                  formik.setFieldValue('agreement', !formik.values.agreement);
                }}
                onBlur={formik.handleBlur('agreement')}
                errorTxt={formik.touched.agreement && formik.errors.agreement}
              />
            </View>
            <ButtonWithLoader
              text="Next"
              onPress={formik.handleSubmit}
              btnStyle={styles.nextBtn}
              submitting={formik.isSubmitting}
            />
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
    backgroundColor: Colors.White
  },
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
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    color: Colors.Black,
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '3%'
  },
  accDet: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16,
    color: Colors.Gray200,
    marginTop: '4%'
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
    backgroundColor: Colors.Primary,
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
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: Colors.LightGray
  },
  checkboxContainer: {
    marginTop: '3%'
  },
  titleProps: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 21,
    color: 'black',
    marginLeft: '5%'
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: Colors.Red,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%'
  }
});
