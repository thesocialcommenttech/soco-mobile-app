import { StyleSheet, View } from 'react-native';
import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import Button from '~/src/components/theme/Button';
import { PasswordInput } from '~/src/components/theme/Input';
import { changeUserPassword } from '~/src/utils/services/settings_services/passoword_services/changeUserPassword.service';
import { AuthActionTypes, setAuthToLogout } from '~/src/store/actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';

interface ChangePasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Password() {
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  async function submitPassword(
    values: ChangePasswordForm,
    formikActions: FormikHelpers<ChangePasswordForm>
  ) {
    try {
      const result = await changeUserPassword({
        oldPassword: values.password,
        newPassword: values.newPassword
      });
      console.log(result.data);

      if (result.data.success) {
        dispatch(setAuthToLogout());
      }
    } catch (error) {
      if (error.response.data.message === 'INVALID_PASS') {
        formik.setFieldError('password', 'Password is incorrect');
      }
      console.error(error);
    }
    formikActions.setSubmitting(false);
  }

  const formik = useFormik<ChangePasswordForm>({
    initialValues: { password: '', newPassword: '', confirmPassword: '' },
    validationSchema: object({
      password: string().trim().required('Password is required'),
      newPassword: string().trim().required('New password is required'),
      confirmPassword: string()
        .trim()
        .required('Confirm password is required')
        .test({
          message: 'Confirm password and New password is not same',
          test: (value, ctx) => ctx.parent.newPassword === value
        })
    }),
    onSubmit: submitPassword
  });

  return (
    <View style={styles.container}>
      <SettingScreenHeader title="Password" />
      <View style={styles.headingview}>
        <SectionHeader label="Change Password" />
        <PasswordInput
          label="Current Password"
          style={styles.passTB}
          inputProp={{
            placeholder: 'Enter current password',
            value: formik.values.password,
            onChangeText: formik.handleChange('password'),
            onBlur: formik.handleBlur('password')
          }}
          error={formik.touched.password && formik.errors.password}
        />
        <PasswordInput
          label="New Password"
          style={styles.passTB}
          inputProp={{
            placeholder: 'Enter new password',
            value: formik.values.newPassword,
            onChange: formik.handleChange('newPassword'),
            onBlur: formik.handleBlur('newPassword')
          }}
          error={formik.touched.newPassword && formik.errors.newPassword}
        />
        <PasswordInput
          label="Confirm Password"
          style={styles.passTB}
          inputProp={{
            placeholder: 'Re-Enter new password',
            value: formik.values.confirmPassword,
            onChange: formik.handleChange('confirmPassword'),
            onBlur: formik.handleBlur('confirmPassword')
          }}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          text="Change Password"
          btnStyle={styles.updateBtn}
          type="filled"
          fullWidth={true}
          disabled={formik.isSubmitting}
          processing={formik.isSubmitting}
          onPress={formik.handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headingview: {
    padding: 20,
    paddingTop: 10
  },
  passTB: {
    marginTop: 30 + 7
  },
  updateBtn: { marginTop: 30 }
});
