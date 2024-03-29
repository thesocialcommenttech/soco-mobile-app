import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { object, string, date } from 'yup';
import { useDispatch } from 'react-redux';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';
import { Colors, Yellow } from '../../utils/colors';
import { register } from '../../utils/services/register_service/register.service';
import { AuthActionTypes, setAuthToLogin } from '../../store/actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { IRootReducer } from '~/src/store/reducers';
import { useRegisterData } from '~/src/state/registerScreenState';
import { RegisterPersonalData } from '~/src/utils/typings/register_interfaces/register.interfce';
import dayjs from 'dayjs';
import { RootRouteContext } from '~/src/contexts/root-route.context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, RadioButton } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';
import { useNavigation } from '@react-navigation/native';
import { IAuthStackScreenProps } from '~/src/types/navigation/auth';
import * as Sentry from '@sentry/react-native';
import { addAxiosErrorDataBreadcrumb } from '~/src/utils/monitoring/sentry';

function RegisterTwoScreen() {
  const navigation = useNavigation<IAuthStackScreenProps['navigation']>();
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

  function openDatePicker(
    currValue: Date,
    onChange: (event: DateTimePickerEvent, date?: Date) => void
  ) {
    DateTimePickerAndroid.open({
      value: currValue ?? new Date(),
      mode: 'date',
      is24Hour: true,
      onChange
    });
  }

  const onRegister = async (
    values: RegisterPersonalData,
    formikActions: FormikHelpers<RegisterPersonalData>
  ) => {
    try {
      const result = await register({ ...accountDetails, ...values });

      if (result.data?.success) {
        await dispatch(
          setAuthToLogin({
            user: result.data.user,
            token: result.data.token
          })
        );
        formikActions.resetForm();
        resetRegisterFormData();
        navigation.navigate('PostRegister', { screen: 'Categories' });
      }
    } catch (error) {
      addAxiosErrorDataBreadcrumb(error);
      Sentry.captureException(error);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.perDet}>Personal Details</Text>
        <Input
          label="Gender"
          style={styles.MT}
          error={formik.touched.gender && formik.errors.gender}
        >
          {({ style }) => (
            <View
              style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
            >
              <RadioButton
                selected={formik.values.gender === 'male'}
                buttonProps={{
                  fullWidth: true,
                  text: 'Male',
                  btnStyle: { marginRight: 20 },
                  onPress: () => {
                    formik.setFieldValue('gender', 'male');
                  }
                }}
              />
              <RadioButton
                selected={formik.values.gender === 'female'}
                buttonProps={{
                  fullWidth: true,
                  text: 'Female',
                  btnStyle: { flexGrow: 1 },
                  onPress: () => {
                    formik.setFieldValue('gender', 'female');
                  }
                }}
              />
            </View>
          )}
        </Input>
        <Input
          label="Academic"
          style={styles.MT}
          error={formik.touched.academic && formik.errors.academic}
        >
          {({ style }) => (
            <View
              style={[style, { flexDirection: 'row', paddingHorizontal: 20 }]}
            >
              <RadioButton
                selected={formik.values.academic === 'graduate'}
                buttonProps={{
                  fullWidth: true,
                  text: 'Graduate',
                  btnStyle: { marginRight: 20 },
                  onPress: () => {
                    formik.setFieldValue('academic', 'graduate');
                  }
                }}
              />
              <RadioButton
                selected={formik.values.academic === 'undergraduate'}
                buttonProps={{
                  fullWidth: true,
                  text: 'Undergraduate',
                  btnStyle: { flexGrow: 1 },
                  onPress: () => {
                    formik.setFieldValue('academic', 'undergraduate');
                  }
                }}
              />
            </View>
          )}
        </Input>
        <Input
          label="Date of Birth"
          style={styles.MT}
          onPress={() => {
            openDatePicker(
              formik.values.dob as Date,
              async (event, selectedDate) => {
                await formik.setFieldValue('dob', selectedDate);
                formik.setFieldTouched('dob');
              }
            );
          }}
          inputProp={{
            placeholder: 'dd/mm/yyyy',
            value:
              formik.values.dob &&
              dayjs(formik.values.dob).format('DD/MM/YYYY'),
            editable: false,
            onChangeText: formik.handleChange('dob'),
            onBlur: formik.handleBlur('dob')
          }}
          error={formik.touched.dob && (formik.errors.dob as string)}
          suffix={
            <Button
              size="sm"
              btnStyle={{ alignSelf: 'center', marginRight: -15 }}
              onPress={() => {
                formik.setFieldTouched('passYear');
                openDatePicker(
                  formik.values.dob as Date,
                  async (event, selectedDate) => {
                    await formik.setFieldValue('dob', selectedDate);
                  }
                );
              }}
            >
              <MaterialCommunityIcons name="calendar" size={24} />
            </Button>
          }
        />
        <Button
          text="Register"
          fullWidth
          type="filled"
          onPress={formik.handleSubmit}
          processing={formik.isSubmitting}
          disabled={formik.isSubmitting}
          textStyle={{ color: 'black' }}
          btnStyle={styles.registerBtn}
        />
      </View>
    </ScrollView>
  );
}

export default RegisterTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  MT: {
    marginTop: 29
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
  registerBtn: {
    backgroundColor: Yellow.primary,
    marginTop: 20
  }
});
