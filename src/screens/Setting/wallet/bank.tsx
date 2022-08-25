import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useFormik } from 'formik';
import { Input } from '~/src/components/theme/Input';

export default function Bank({
  formContorler
}: {
  formContorler: ReturnType<typeof useFormik>;
}) {
  return (
    <View style={styles.container}>
      <Input
        label="Account Holder Name"
        style={styles.input}
        inputProp={{
          placeholder: 'Account holder name',
          value: formContorler.values.holder_name,
          onChangeText: formContorler.handleChange('holder_name'),
          onBlur: formContorler.handleBlur('holder_name')
        }}
        error={
          formContorler.touched.holder_name &&
          (formContorler.errors.holder_name as string)
        }
      />
      <Input
        label="Account Number"
        style={styles.input}
        inputProp={{
          placeholder: 'Account number',
          value: formContorler.values.bank_account_no,
          onChangeText: formContorler.handleChange('bank_account_no'),
          onBlur: formContorler.handleBlur('bank_account_no')
        }}
        error={
          formContorler.touched.bank_account_no &&
          (formContorler.errors.bank_account_no as string)
        }
      />
      <Input
        label="IFSC"
        style={styles.input}
        inputProp={{
          placeholder: 'Bank IFSC',
          value: formContorler.values.bank_ifsc,
          onChangeText: formContorler.handleChange('bank_ifsc'),
          onBlur: formContorler.handleBlur('bank_ifsc')
        }}
        error={
          formContorler.touched.bank_ifsc &&
          (formContorler.errors.bank_ifsc as string)
        }
      />

      {/* <TextInputWithLabel
        placeholder="Account holder name"
        label="Account Holder Name"
        inputStyle={styles.upiTB}
        onChangeText={formContorler.handleChange('upi')}
        value={formContorler.values.upi}
        errorTxt={formContorler.touched.upi && formContorler.errors.upi}
        onBlur={formContorler.handleBlur('upi')}
      /> */}
      {/* <TextInputWithLabel
        placeholder="Account Number"
        label="Account number"
        inputStyle={styles.upiTB}
        onChangeText={formContorler.handleChange('upi')}
        value={formContorler.values.upi}
        errorTxt={formContorler.touched.upi && formContorler.errors.upi}
        onBlur={formContorler.handleBlur('upi')}
      /> */}
      {/* <TextInputWithLabel
        placeholder="Bank IFSC"
        label="IFSC"
        inputStyle={styles.upiTB}
        onChangeText={formContorler.handleChange('upi')}
        value={formContorler.values.upi}
        errorTxt={formContorler.touched.upi && formContorler.errors.upi}
        onBlur={formContorler.handleBlur('upi')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    marginTop: 20
  }
});
