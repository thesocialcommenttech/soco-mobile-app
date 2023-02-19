import { Text, View } from 'react-native';
import React from 'react';
import { Input } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';
import { Black } from '~/src/utils/colors';
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { requestResetUserPassword } from '~/src/utils/services/password_services/requestResetUserPassword.service';
import { useNavigation } from '@react-navigation/native';
import { IAuthStackScreenProps } from '~/src/types/navigation/auth';
import * as Sentry from '@sentry/react-native';
import { addAxiosErrorDataBreadcrumb } from '~/src/utils/monitoring/sentry';

interface SendResetLinkForm {
  email: string;
}

function ForgotPasswordScreen() {
  const navigation = useNavigation<IAuthStackScreenProps['navigation']>();
  async function sendResetPasswordLink(
    values: SendResetLinkForm,
    formikActions: FormikHelpers<SendResetLinkForm>
  ) {
    try {
      const result = await requestResetUserPassword(values.email);
      console.log(result.data);

      if (result.data.success) {
        navigation.navigate('ResetPasswordLinkSent');
      }
    } catch (error) {
      if (error.response.data.message === 'INVALID_PASS') {
        formik.setFieldError('password', 'Password is incorrect');
        return;
      }
      addAxiosErrorDataBreadcrumb(error);
      Sentry.captureException(error);
      console.error(error);
    }
    formikActions.setSubmitting(false);
  }

  const formik = useFormik<SendResetLinkForm>({
    initialValues: { email: '' },
    validationSchema: object({
      email: string().trim().required('Email is required')
    }),
    onSubmit: sendResetPasswordLink
  });

  return (
    <View
      style={{
        padding: 20
      }}
    >
      <Text
        style={{
          fontFamily: 'Roboto-Medium',
          fontSize: 22,
          marginBottom: 10,
          // marginTop: 30,
          color: 'black'
        }}
      >
        Forgot Password?
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Black[600],
          marginBottom: 30
        }}
      >
        Enter the email associated with your account. W'll send you a password
        reset link.
      </Text>
      <Input
        label="Email"
        inputProp={{
          keyboardType: 'email-address',
          placeholder: 'your_email@example.com',
          value: formik.values.email,
          onChangeText: formik.handleChange('email'),
          onBlur: formik.handleBlur('email')
        }}
        error={formik.touched.email && formik.errors.email}
      />
      <Button
        type="filled"
        fullWidth
        processing={formik.isSubmitting}
        disabled={formik.isSubmitting}
        onPress={formik.handleSubmit}
        btnStyle={{
          marginTop: 20
        }}
        text="Send Reset Link"
      />
    </View>
  );
}

export default ForgotPasswordScreen;
