import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import axios, { CancelTokenSource } from 'axios';
import * as Sentry from '@sentry/react-native';
import { addAxiosErrorDataBreadcrumb } from '~/src/utils/monitoring/sentry';

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
  const [emailAvialable, setEmailAvialable] = useState(undefined);
  const [usernameAvialable, setUsernameAvialable] = useState(undefined);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const emailApiReqController = useRef<CancelTokenSource>();
  const usernameApiReqController = useRef<CancelTokenSource>();

  function onNext(values: RegisterAccountData) {
    setAccountDetails(values);
    navigation.navigate('RegisterTwo');
  }

  const NextSchema = object({
    email: string()
      .trim()
      .email('Invalid email address')
      .test('availability', 'Email already exist', value => {
        if (typeof emailAvialable === 'boolean' && value) {
          return emailAvialable;
        }
        return true;
      })
      .required('Email is Required'),
    password: string().trim().required('Password is Required'),
    name: string().trim().required('Name is Required'),
    username: string()
      .trim()
      .matches(/^[0-9a-zA-Z_]+$/, {
        name: 'validUsername',
        message: 'Only lower/upper case letters, numbers and _ is allowed.'
      })
      .test('availability', 'Username already exist', value => {
        if (typeof usernameAvialable === 'boolean' && value) {
          return usernameAvialable;
        }
        return true;
      })
      .required('Username is Required'),
    referal: string()
      .matches(/^[A-Z0-9]{6}$/, {
        message:
          'Invalid code! Should be 6 letters code, Combination of capital letter and numbers'
      })
      .trim(),
    agreement: boolean().oneOf(
      [true],
      'You must agree to the terms and conditions and privacy policy'
    )
  });

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

  const isEmailAvailable = useCallback(
    debounce(async () => {
      setCheckingEmail(true);
      if (formik.values.email) {
        emailApiReqController.current = axios.CancelToken.source();
        try {
          const result = await checkAvailablity({
            property: 'email',
            value: formik.values.email,
            controller: emailApiReqController.current
          });

          if (result.data.success) {
            setEmailAvialable(result.data.availablity);
            await formik.setFieldTouched('email', true);
          }
        } catch (error) {
          addAxiosErrorDataBreadcrumb(error);
          Sentry.captureException(error);
        }
      } else {
        setEmailAvialable(undefined);
      }
      setCheckingEmail(false);
    }),
    [setEmailAvialable, formik]
  );

  const isUsernameAvailable = useCallback(
    debounce(async () => {
      setCheckingUsername(true);
      if (formik.values.username) {
        usernameApiReqController.current = axios.CancelToken.source();

        try {
          const result = await checkAvailablity({
            property: 'username',
            value: formik.values.username,
            controller: usernameApiReqController.current
          });

          if (result.data.success) {
            setUsernameAvialable(result.data.availablity);
            await formik.setFieldTouched('username', true);
          }
        } catch (error) {
          addAxiosErrorDataBreadcrumb(error);
          Sentry.captureException(error);
        }
      } else {
        setUsernameAvialable(undefined);
      }
      setCheckingUsername(false);
    }, 300),
    [setUsernameAvialable, formik]
  );

  useEffect(() => {
    if (formik.values.email) {
      isEmailAvailable.cancel();
      if (emailApiReqController.current) {
        emailApiReqController.current.cancel();
      }
      isEmailAvailable();
    }
  }, [formik.values.email]);

  useEffect(() => {
    if (formik.values.username) {
      isUsernameAvailable.cancel();
      if (usernameApiReqController.current) {
        usernameApiReqController.current.cancel();
      }
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
