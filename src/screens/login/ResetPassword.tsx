import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { PasswordInput } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  IAuthStackScreenProps,
  IResetPasswordScreenProps
} from '~/src/types/navigation/auth';
import { resetUserPassword } from '~/src/utils/services/password_services/resetUserPassword.service';
import Toast from 'react-native-toast-message';

interface ResetPasswordForm {
  password: string;
  passwordConf: string;
}

function ResetPasswordScreen() {
  const navigation = useNavigation<IAuthStackScreenProps['navigation']>();
  const route = useRoute<IResetPasswordScreenProps['route']>();
  async function sendResetPasswordLink(
    values: ResetPasswordForm,
    formikActions: FormikHelpers<ResetPasswordForm>
  ) {
    try {
      const result = await resetUserPassword(
        values.password,
        route.params.hash
      );
      if (result.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Password Reset Successfully.'
        });
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error?.response?.data.message === 'INVLD_PSWD_RST_RQST') {
        Toast.show({
          type: 'error',
          text1: 'Invalid/Expired password reset link.'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error occured! Try Again.'
        });
      }
    }
    formikActions.setSubmitting(false);
  }

  const formik = useFormik<ResetPasswordForm>({
    initialValues: { passwordConf: '', password: '' },
    validationSchema: object({
      password: string().trim().required('Password is required'),
      passwordConf: string()
        .trim()
        .test({
          message: 'Confirm password and New password is not same',
          test: (value, ctx) => ctx.parent.password === value
        })
        .required('Confirm password is required')
    }),
    onSubmit: sendResetPasswordLink
  });

  return (
    <View style={{ padding: 20 }}>
      <PasswordInput
        label="Password"
        // style={{ marginTop: 50 }}
        inputProp={{
          placeholder: 'Password',
          onBlur: formik.handleBlur('password'),
          value: formik.values.password,
          onChangeText: formik.handleChange('password')
        }}
        error={formik.touched.password && formik.errors.password}
      />
      <PasswordInput
        label="Confirm Password"
        style={styles.MT}
        inputProp={{
          placeholder: 'Confirm Password',
          onBlur: formik.handleBlur('passwordConf'),
          value: formik.values.passwordConf,
          onChangeText: formik.handleChange('passwordConf')
        }}
        error={formik.touched.passwordConf && formik.errors.passwordConf}
      />
      <Button
        type="filled"
        fullWidth
        processing={formik.isSubmitting}
        disabled={formik.isSubmitting}
        onPress={formik.handleSubmit}
        btnStyle={{ marginTop: 20 }}
        text="Reset Password"
      />
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  MT: { marginTop: 29 }
});
