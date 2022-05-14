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
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDetails,
  setUserDetails
} from '../../store/reducers/register';
import CustomRadioButton from '../../components/customRadioButton';
import { TextInput } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AntIcon from 'react-native-vector-icons/AntDesign';

const RegisterTwoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector(selectUserDetails);

  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    setDate(currentDate);
    dispatch(
      setUserDetails({
        ...state,
        dob: currentDate.toLocaleDateString()
      })
    );
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

  const onRegister = (
    values: any,
    formikActions: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    console.log('values', values);
    dispatch(
      setUserDetails({
        ...state,
        gender: values.gender,
        academics: values.academics
      })
    );
    setTimeout(() => {
      formikActions.setSubmitting(false);
      formikActions.resetForm();
      navigation.navigate('RegisterTwo');
    }, 1000);
  };

  const RegisterSchema = object().shape({
    gender: string().required('Gender is required'),
    academics: string().required('Academics is required')
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
            <Formik
              initialValues={state}
              validationSchema={RegisterSchema}
              onSubmit={onRegister}
            >
              {({
                errors,
                touched,
                handleBlur,
                isSubmitting,
                handleSubmit,
                setFieldValue
              }) => {
                return (
                  <>
                    <CustomRadioButton
                      label={'Gender'}
                      option1="Male"
                      option2="Female"
                      onPress={(option: string) => {
                        console.log(option);
                        setFieldValue('gender', option);
                      }}
                      onBlur={handleBlur('gender')}
                      errorTxt={touched.gender && errors.gender}
                    />
                    <CustomRadioButton
                      label={'Academics'}
                      option1="Graduate"
                      option2="Undergraduate"
                      onPress={(option: string) => {
                        console.log(option);
                        setFieldValue('academics', option);
                      }}
                      onBlur={handleBlur('academics')}
                      errorTxt={touched.academics && errors.academics}
                    />
                    <TextInputWithLabel
                      placeholder="dd/mm/yyyy"
                      label="Date of Birth"
                      inputStyle={styles.dobTB}
                      value={date.toLocaleDateString()}
                      errorTxt={touched.dob && errors.dob}
                      onBlur={handleBlur('dob')}
                      right={
                        <TextInput.Icon
                          color="#000"
                          name={'calendar-blank'}
                          style={styles.cal}
                          onPress={showDatepicker}
                        />
                      }
                      editable={false}
                    />
                    <ButtonWithLoader
                      text="Register"
                      onPress={handleSubmit}
                      btnStyle={styles.registerBtn}
                      submitting={isSubmitting}
                    />
                  </>
                );
              }}
            </Formik>
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
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  backBtn: {
    padding: 20
  },
  register: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 20,
    color: '#000',
    fontStyle: 'normal',
    lineHeight: 32,
    marginTop: '3%'
  },
  perDet: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16,
    color: '#BDBDBD',
    marginTop: '4%'
  },
  forPass: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD',
    marginTop: '20%'
  },
  dontAcc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD',
    marginTop: '3%'
  },
  crAcc: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#0063FF'
  },
  dobTB: {
    marginTop: '-6%'
  },
  cal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerBtn: {
    backgroundColor: '#FFCA12',
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
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16.41,
    color: '#AFAFBD'
  },
  checkboxContainer: {
    marginTop: '3%'
  },
  titleProps: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 21,
    color: 'black',
    marginLeft: '5%'
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: '#EE0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%'
  }
});
