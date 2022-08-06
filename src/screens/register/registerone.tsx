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
import { useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import { CheckBox } from '@rneui/base';
import { Colors } from '../../utils/colors';
import { RegisterAccountData } from '../../utils/typings/register_interfaces/register.interfce';
import { useRegisterData } from '~/src/state/registerScreenState';
import logo from '../../assets/images/logos/Untitled.png';

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
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const { setAccountDetails } = useRegisterData();

  function onNext(values: RegisterAccountData) {
    setAccountDetails(values);
    navigation.navigate('RegisterTwo');
  }

  const NextSchema = object({
    email: string()
      .trim()
      .email('Invalid email address')
      .required('Email is Required'),
    password: string().trim().required('Password is Required'),
    name: string().trim().required('Name is Required'),
    username: string().trim().required('Username is Required'),
    referal: string().trim(),
    agreement: boolean().oneOf(
      [true],
      'You must agree to the terms and conditions and privacy policy'
    )
  });

  const Eyeclick = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const formik = useFormik<RegisterAccountData>({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      agreement: false,
      referal: ''
    },
    validationSchema: NextSchema,
    onSubmit: onNext
  });

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.outContainer}>
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
              keyboardType="email-address"
              value={formik.values.email}
              errorTxt={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur('email')}
            />

            <TextInputWithLabel
              placeholder="Password"
              label="Password"
              isSecureTextEntry={isPasswordHidden}
              inputStyle={styles.passTB}
              right={
                <TextInput.Icon
                  color={Colors.Secondary}
                  name={isPasswordHidden ? 'eye-outline' : 'eye-off-outline'}
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}
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
              // submitting={formik.isSubmitting}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    marginTop: 25,
    width: 180,
    resizeMode: 'contain'
  },
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 30,
    color: Colors.Black,
    fontStyle: 'normal',
    lineHeight: 32
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
    alignItems: 'center'
    // marginTop: '50%'
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
