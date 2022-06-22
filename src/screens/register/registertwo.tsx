import {
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
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch } from 'react-redux';
import CustomRadioButton from '../../components/customRadioButton';
import { TextInput } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../utils/colors';
import { register } from '../../utils/services/register_service/register.service';
import { RegisterRequest } from '../../utils/typings/register_interface/register.interface';
import { AuthActionTypes, setAuthToLogin } from '../../store/actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '~/src/store/reducers';

const RegisterTwoScreen = ({ route, navigation }) => {
  const state = route.params;

  const [date, setDate] = useState(new Date());
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onRegister = async (
    values: RegisterRequest,
    formikActions: FormikHelpers<RegisterRequest>
  ) => {
    const payload: RegisterRequest = {
      ...state,
      academic: values.academic,
      gender: values.gender,
      dob: date.toLocaleDateString()
    };
    const response = await register(payload);

    if (response.data?.success) {
      console.log('success', response.data);
      formikActions.resetForm();
      navigation.navigate('OptionalInfo', response.data);
      // dispatch(
      //   setAuthToLogin({
      //     user: response.data.user,
      //     token: response.data.token
      //   })
      // );
    } else {
      console.log('ERR', response.data);
    }
    formikActions.setSubmitting(false);
  };

  const RegisterSchema = object().shape({
    gender: string().required('Gender is required'),
    academic: string().required('Academic is required')
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: RegisterSchema,
    onSubmit: onRegister
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outContainer}>
        <AntIcon
          name="left"
          size={20}
          color="black"
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.perDet}>Personal Details</Text>
            <CustomRadioButton
              label={'Gender'}
              option1="Male"
              option2="Female"
              onPress={(option: string) => {
                formik.setFieldValue('gender', option);
              }}
              onBlur={formik.handleBlur('gender')}
              errorTxt={formik.touched.gender && formik.errors.gender}
            />
            <CustomRadioButton
              label={'Academic'}
              option1="Graduate"
              option2="Undergraduate"
              onPress={(option: string) => {
                formik.setFieldValue('academic', option);
              }}
              onBlur={formik.handleBlur('academic')}
              errorTxt={formik.touched.academic && formik.errors.academic}
            />
            <TextInputWithLabel
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              inputStyle={styles.dobTB}
              value={date.toLocaleDateString()}
              errorTxt={formik.touched.dob && formik.errors.dob}
              onBlur={formik.handleBlur('dob')}
              right={
                <TextInput.Icon
                  color={Colors.Black}
                  name={'calendar-blank'}
                  style={styles.cal}
                  onPress={showDatepicker}
                />
              }
              editable={false}
            />
            <ButtonWithLoader
              text="Register"
              onPress={formik.handleSubmit}
              btnStyle={styles.registerBtn}
              submitting={formik.isSubmitting}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterTwoScreen;

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
  backBtn: {
    padding: 20
  },
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    color: Colors.Black,
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '3%'
  },
  perDet: {
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
  dobTB: {
    marginTop: '-6%'
  },
  cal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerBtn: {
    backgroundColor: Colors.Primary,
    height: 46,
    borderRadius: 8,
    marginTop: '12%',
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
