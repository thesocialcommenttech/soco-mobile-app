import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import ButtonWithoutLoader from '../../../components/buttonWithoutLoader';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { TextInput } from 'react-native-paper';
import { Colors } from '../../../utils/colors';

export default function Password() {
  const [isSecure, setIsSecure] = useState(true);
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

  const state: {
    password: string;
    newPassword: string;
    confirmPassword: string;
  } = {
    password: '',
    newPassword: '',
    confirmPassword: ''
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
    formikActions.setSubmitting(false);
  };

  const LoginSchema = object().shape({
    password: string().required('Password is Required'),
    newPassword: string().required('New Password cannot be empty'),
    confirmPassword: string().required('Confirm password cannot be empty')
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: LoginSchema,
    onSubmit: onLogin
  });

  const Eyelick = () => {
    setIsSecure(!isSecure);
  };

  const Eyelick1 = () => {
    setIsSecure1(!isSecure1);
  };

  const Eyelick2 = () => {
    setIsSecure2(!isSecure2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingview}>
        <View style={styles.header}>
          <Text style={styles.heading}>Change Password</Text>
        </View>
        <TextInputWithLabel
          placeholder="Enter your current password"
          label="Current Password"
          isSecureTextEntry={isSecure}
          onBlur={formik.handleBlur('password')}
          inputStyle={styles.passTB}
          errorTxt={formik.touched.password && formik.errors.password}
          right={
            <TextInput.Icon
              color=Colors.Secondary
              name={isSecure ? 'eye-outline' : 'eye-off-outline'}
              onPress={Eyelick}
              style={styles.eye}
            />
          }
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        <TextInputWithLabel
          placeholder="Enter new your new password"
          label="New Password"
          isSecureTextEntry={isSecure1}
          onBlur={formik.handleBlur('newPassword')}
          inputStyle={styles.passTB}
          errorTxt={formik.touched.password && formik.errors.newPassword}
          right={
            <TextInput.Icon
              color=Colors.Secondary
              name={isSecure1 ? 'eye-outline' : 'eye-off-outline'}
              onPress={Eyelick1}
              style={styles.eye}
            />
          }
          value={formik.values.newPassword}
          onChangeText={formik.handleChange('newPassword')}
        />
        <TextInputWithLabel
          placeholder="Confirm your new password"
          label="Confirm Password"
          isSecureTextEntry={isSecure2}
          onBlur={formik.handleBlur('confirmPassword')}
          inputStyle={styles.passTB}
          errorTxt={formik.touched.password && formik.errors.confirmPassword}
          right={
            <TextInput.Icon
              color=Colors.Secondary
              name={isSecure2 ? 'eye-outline' : 'eye-off-outline'}
              onPress={Eyelick2}
              style={styles.eye}
            />
          }
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
        />
        <ButtonWithoutLoader
          text="Change Password"
          onPress={formik.handleSubmit}
          btnStyle={styles.loginBtn}
          submitting={formik.isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%'
  },
  heading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  headingview: {
    marginTop: '4.5%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  passTB: {
    marginTop: '-6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  header: {
    marginTop: '0%',
    marginBottom: '-2%',
    marginLeft: '1.5%'
  },
  loginBtn: {
    backgroundColor: Colors.Secondary,
    height: 50,
    borderRadius: 8,
    marginTop: '8%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
