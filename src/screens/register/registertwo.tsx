import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import TextInputWithLabel from '../../components/textInputWithLabel';
import ButtonWithLoader from '../../components/buttonWithLoader';
import { FormikHelpers, useFormik } from 'formik';
import { object, string, date } from 'yup';
import { useDispatch } from 'react-redux';
import CustomRadioButton from '../../components/customRadioButton';
import { TextInput } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../utils/colors';
import { register } from '../../utils/services/register_service/register.service';
import { AuthActionTypes, setAuthToLogin } from '../../store/actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '~/src/store/reducers';
import { useRegisterData } from '~/src/state/registerScreenState';
import { RegisterPersonalData } from '~/src/utils/typings/register_interfaces/register.interfce';
import dayjs from 'dayjs';
import { RootRouteContext } from '~/src/contexts/root-route.context';

function RegisterTwoScreen({ route, navigation }) {
  const {
    accountDetails,
    resetRegisterFormData,
    personalDetails,
    setPersonalDetails
  } = useRegisterData();

  const { showPostRegisterationFlow } = useContext(RootRouteContext);

  // const [date, setDate] = useState(new Date());
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: (formik.values.dob as Date) ?? new Date(),
      onChange: async (event, selectedDate) => {
        await formik.setFieldValue('dob', selectedDate);
        setPersonalDetails({ ...personalDetails, dob: selectedDate });
      },
      mode: 'date',
      is24Hour: true
    });
  };

  const onRegister = async (
    values: RegisterPersonalData,
    formikActions: FormikHelpers<RegisterPersonalData>
  ) => {
    try {
      const result = await register({ ...accountDetails, ...values });

      if (result.data?.success) {
        dispatch(
          setAuthToLogin({
            user: result.data.user,
            token: result.data.token
          })
        );
        formikActions.resetForm();
        resetRegisterFormData();
        // navigation.navigate('OptionalInfo', result.data);
        showPostRegisterationFlow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik<RegisterPersonalData>({
    initialValues: {
      academic: personalDetails?.academic,
      dob: personalDetails?.dob,
      gender: personalDetails?.gender
    },
    validationSchema: object().shape({
      gender: string().required('Gender is required'),
      academic: string().required('Academic is required'),
      dob: date().required('Date of Birth is required').nullable()
    }),
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
              options={['Male', 'Female']}
              initialSelection={formik.values.gender}
              // option2="Female"
              onSelectionChange={async selection => {
                await formik.setFieldValue('gender', selection.option);
                setPersonalDetails({
                  ...personalDetails,
                  gender: selection.option
                });
              }}
              // onBlur={formik.handleBlur('gender')}
              errorTxt={formik.touched.gender && formik.errors.gender}
            />
            <CustomRadioButton
              label={'Academic'}
              options={['Graduate', 'Undergraduate']}
              // option2=
              onSelectionChange={async selection => {
                await formik.setFieldValue('academic', selection.option);
                setPersonalDetails({
                  ...personalDetails,
                  academic: selection.option
                });
              }}
              initialSelection={formik.values.academic}
              // onBlur={formik.handleBlur('academic')}
              errorTxt={formik.touched.academic && formik.errors.academic}
            />
            <TextInputWithLabel
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              inputStyle={styles.dobTB}
              value={
                formik.values.dob
                  ? dayjs(formik.values.dob).format('DD/MM/YYYY')
                  : ''
              }
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
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
