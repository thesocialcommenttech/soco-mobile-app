import {
  Image,
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
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { object, string, date } from 'yup';
import { CheckBox } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDetails,
  setUserDetails
} from '../../store/reducers/register';
var logo = require('../../assets/images/logos/Untitled.png');

const CustomCheckBox = (props: any) => {
  return (
    <>
      <CheckBox
        checked={props.checked}
        onPress={props.onPress}
        onBlur={props.onBlur}
        title="By sign up you agree to the terms and condition and privacy policy"
        titleProps={{
          style: styles.titleProps
        }}
        containerStyle={styles.checkboxContainer}
        size={18}
        checkedColor="black"
        uncheckedColor="black"
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
    </>
  );
};

const RegisterTwoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const state = useSelector(selectUserDetails);

  const onNext = (
    values: any,
    formikActions: {
      setSubmitting: (arg0: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    dispatch(setUserDetails(values));
    setTimeout(() => {
      formikActions.setSubmitting(false);
      formikActions.resetForm();
      setIsChecked(false);
      navigation.navigate('RegisterTwo');
    }, 1000);
  };

  const NextSchema = object().shape({
    gender: string().required('Gender is required'),
    academics: string().required('Academics is required'),
    dob: date().required('Date of birth is required')
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.outContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.register}>Register</Text>
            <Text style={styles.perDet}>Personal Details</Text>
            <Formik
              initialValues={state}
              validationSchema={NextSchema}
              onSubmit={onNext}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
                handleSubmit
              }) => {
                const { gender, academics, dob } = values;
                return (
                  <>
                    {/* <View>
                      <CustomCheckBox
                        checked={isChecked}
                        onPress={() => {
                          setIsChecked(!isChecked);
                          values = { ...values, isChecked: !isChecked };
                          handleChange('isChecked');
                        }}
                        onBlur={handleBlur('isChecked')}
                        errorTxt={touched.isChecked && errors.isChecked}
                      />
                    </View> */}
                    <ButtonWithLoader
                      text="Register"
                      onPress={handleSubmit}
                      btnStyle={styles.nextBtn}
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
  logo: {
    marginTop: '5%',
    width: '57%',
    resizeMode: 'contain'
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
  nameTB: {
    marginTop: '5%'
  },
  usernameTB: {
    marginTop: '8%'
  },
  emailTB: {
    marginTop: '8%'
  },
  passTB: {
    marginTop: '8%'
  },
  refTB: {
    marginTop: '8%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  nextBtn: {
    backgroundColor: '#FFCA12',
    height: 46,
    borderRadius: 8,
    marginTop: '6%',
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
