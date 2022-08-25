import { StyleSheet } from 'react-native';
import React from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Input } from '~/src/components/theme/Input';

export default function Upi({
  formContorler
}: {
  formContorler: ReturnType<typeof useFormik>;
}) {
  return (
    <Input
      label="UPI"
      inputProp={{
        placeholder: 'UPI ID',
        value: formContorler.values.upi_id,
        onChangeText: formContorler.handleChange('upi_id'),
        onBlur: formContorler.handleBlur('upi_id')
      }}
      error={
        formContorler.touched.upi_id && (formContorler.errors.upi_id as string)
      }
    />
  );
}

const styles = StyleSheet.create({});
