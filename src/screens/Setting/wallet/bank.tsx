import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { useFormik } from 'formik';
import { object, string, number } from 'yup';
import CheckBox from '@react-native-community/checkbox';

export default function Bank() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const state: {
    name: string;
    accnum: number;
    upi: string;
  } = {
    name: '',
    accnum: 0,
    upi: ''
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
    //dispatch(setAuth(true));
    formikActions.setSubmitting(false);
  };

  const upiRegEx = /^[\w.-]+@[\w.-]+$/;

  const LoginSchema = object().shape({
    upi: string()
      .matches(upiRegEx, 'UPI Id is not valid')
      .required('UPI Id is Required'),
    name: string().required('Account holder name is Required'),
    accnum: number().required('Account number is required')
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: LoginSchema,
    onSubmit: onLogin
  });

  return (
    <View style={styles.container}>
      <TextInputWithLabel
        placeholder="Account holder name"
        label="Account Holder Name"
        inputStyle={styles.upiTB}
        onChangeText={formik.handleChange('upi')}
        value={formik.values.upi}
        errorTxt={formik.touched.upi && formik.errors.upi}
        onBlur={formik.handleBlur('upi')}
      />
      <TextInputWithLabel
        placeholder="Account Number"
        label="Account number"
        inputStyle={styles.upiTB}
        onChangeText={formik.handleChange('upi')}
        value={formik.values.upi}
        errorTxt={formik.touched.upi && formik.errors.upi}
        onBlur={formik.handleBlur('upi')}
      />
      <TextInputWithLabel
        placeholder="Bank IFSC"
        label="IFSC"
        inputStyle={styles.upiTB}
        onChangeText={formik.handleChange('upi')}
        value={formik.values.upi}
        errorTxt={formik.touched.upi && formik.errors.upi}
        onBlur={formik.handleBlur('upi')}
      />
      <View style={styles.checkboxview}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          tintColor={'#000000'}
        />
        <Text style={styles.checktext}>
          Check your bank Account/UPI details twice, carefully before adding it.
          For any mistakes in giving the details of the account you are solely
          responsible.
        </Text>
      </View>
      <View style={styles.btn}>
        <TouchableWithoutFeedback>
          <Text style={styles.btntext}>Add Account</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '4%',
    marginLeft: '4%',
    marginRight: '4%'
  },
  upiTB: {
    marginTop: '-6%'
  },
  checkboxview: {
    marginTop: '9%',
    flexDirection: 'row'
  },
  checktext: {
    marginLeft: '1%',
    marginRight: '8%',
    fontSize: 15.5,
    color: 'black',
    lineHeight: 20
  },
  btn: {
    alignItems: 'center',
    padding: '4%',
    backgroundColor: '#0063FF',
    borderRadius: 6,
    marginTop: '4%'
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15.5
  }
});
