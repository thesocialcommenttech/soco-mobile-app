import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import { Black, Blue, Colors, Red, Yellow } from '../../utils/colors';
import { RegisterAccountData } from '../../utils/typings/register_interfaces/register.interfce';
import { useRegisterData } from '~/src/state/registerScreenState';
import { Input, InputError, PasswordInput } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkAvailablity } from '~/src/utils/services/user-profile_service/updateUserEmail.service';
import { debounce } from 'lodash';

const CustomCheckBox = (props: {
  onPress: () => void;
  checked: boolean;
  error: string;
}) => {
  return (
    <>
      <View style={[styles.agreementCt]}>
        <Button
          btnStyle={styles.agreementCheckbox}
          size="sm"
          onPress={props.onPress}
        >
          <MaterialCommunityIcons
            name={
              props.checked
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            color={props.error ? Red.primary : 'black'}
            size={24}
          />
        </Button>
        <Text onPress={props.onPress} style={styles.agreementMsg}>
          By sign up you agree to the terms and condition and privacy policy of
          thesocialcomment
        </Text>
      </View>
      {props.error && <InputError error={props.error} />}
    </>
  );
};

const RegisterOneScreen = ({ navigation }) => {
  const { setAccountDetails } = useRegisterData();
  const emailAvialable = useRef(null);
  const usernameAvialable = useRef(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  function onNext(values: RegisterAccountData) {
    setAccountDetails(values);
    navigation.navigate('RegisterTwo');
  }

  const NextSchema = object({
    email: string()
      .trim()
      .email('Invalid email address')
      .test('availability', 'Email already exist', () => emailAvialable.current)
      .required('Email is Required'),
    password: string().trim().required('Password is Required'),
    name: string().trim().required('Name is Required'),
    username: string()
      .trim()
      .test(
        'availability',
        'Username already exist',
        () => usernameAvialable.current
      )
      .required('Username is Required'),
    referal: string().trim(),
    agreement: boolean().oneOf(
      [true],
      'You must agree to the terms and conditions and privacy policy'
    )
  });

  const isEmailAvailable = debounce(async () => {
    setCheckingEmail(true);
    const result = await checkAvailablity({
      property: 'email',
      value: formik.values.email
    });

    if (result.data.success) {
      emailAvialable.current = result.data.availablity;
    }
    setCheckingEmail(false);
  });

  const isUsernameAvailable = debounce(async () => {
    setCheckingUsername(true);
    const result = await checkAvailablity({
      property: 'username',
      value: formik.values.username
    });

    if (result.data.success) {
      usernameAvialable.current = result.data.availablity;
    }
    setCheckingUsername(false);
  }, 300);

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

  useEffect(() => {
    if (formik.values.email) {
      isEmailAvailable.cancel();
      isEmailAvailable();
    }
  }, [formik.values.email]);

  useEffect(() => {
    if (formik.values.username) {
      isUsernameAvailable.cancel();
      isUsernameAvailable();
    }
  }, [formik.values.username]);

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        {/* <Image style={styles.logo} source={logo} /> */}
        <Text style={styles.register}>Create a new Account</Text>
        <Text style={styles.accDet}>Account Details</Text>
        <Input
          label="Name"
          inputProp={{
            placeholder: 'Name',
            onChangeText: formik.handleChange('name'),
            value: formik.values.name,
            onBlur: formik.handleBlur('name')
          }}
          error={formik.touched.name && formik.errors.name}
        />
        <Input
          label="Username"
          style={styles.MT}
          inputProp={{
            placeholder: 'Username',
            onChangeText: formik.handleChange('username'),
            value: formik.values.username,
            onBlur: formik.handleBlur('username')
          }}
          suffix={
            checkingUsername && (
              <ActivityIndicator color={Blue.primary} size={16} />
            )
          }
          error={formik.touched.username && formik.errors.username}
        />
        <Input
          label="Email"
          style={styles.MT}
          inputProp={{
            placeholder: 'Email',
            onChangeText: formik.handleChange('email'),
            keyboardType: 'email-address',
            value: formik.values.email,
            onBlur: formik.handleBlur('email')
          }}
          suffix={
            checkingEmail && (
              <ActivityIndicator color={Blue.primary} size={16} />
            )
          }
          error={formik.touched.email && formik.errors.email}
        />

        <PasswordInput
          label="Password"
          style={styles.MT}
          inputProp={{
            placeholder: 'Password',
            value: formik.values.password,
            onChangeText: formik.handleChange('password'),
            onBlur: formik.handleBlur('password')
          }}
          error={formik.touched.password && formik.errors.password}
        />
        <Input
          label="Referral (Optional)"
          style={styles.MT}
          inputProp={{
            placeholder: 'Referral (Optional)',
            onChangeText: formik.handleChange('referal'),
            value: formik.values.referal,
            onBlur: formik.handleBlur('referal')
          }}
          error={formik.touched.referal && formik.errors.referal}
        />
        <CustomCheckBox
          checked={formik.values.agreement}
          onPress={() => {
            formik.setFieldValue('agreement', !formik.values.agreement);
          }}
          error={formik.touched.agreement && formik.errors.agreement}
        />
        <Button
          text="Next"
          fullWidth
          disabled={checkingEmail || checkingUsername}
          onPress={formik.handleSubmit}
          textStyle={{ color: 'black' }}
          btnStyle={styles.nextBtn}
        />
      </View>
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
    padding: 20
  },
  logo: {
    // marginTop: 25,
    width: 180,
    resizeMode: 'contain'
  },
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 30,
    color: 'black'
  },
  accDet: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Black[500],
    marginTop: 20,
    marginBottom: 10
  },
  MT: {
    marginTop: 29
  },
  nextBtn: {
    backgroundColor: Yellow.primary,
    marginTop: 20
  },
  agreementCt: {
    flexDirection: 'row',
    marginTop: 20
  },
  agreementCheckbox: {
    marginTop: -8,
    marginLeft: -5,
    paddingHorizontal: 10
  },
  agreementMsg: { flexShrink: 1, lineHeight: 17, color: 'black' }
});
