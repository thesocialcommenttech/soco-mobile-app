import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Blue } from '../../../utils/colors';
import { updateProfile } from '~/src/utils/services/settings_services/profile_services/updateProfile.service';
import { UpdateProfileRequest } from '~/src/utils/typings/settings_interfaces/profile_interface/updateProfile.interface';
import Button from '~/src/components/theme/Button';
import { toNumber } from 'lodash';
import { getUserData2 } from '~/src/utils/services/user-profile_service/getUserData2.service';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { SelectInput } from '~/src/components/theme/Input';
import Loading from '~/src/components/theme/Loading';
import {
  checkAvailablity,
  updateUserEmail
} from '~/src/utils/services/user-profile_service/updateUserEmail.service';
import { CheckAvailabilityRequest } from '~/src/utils/typings/user-profile_interface/updateUserEmail.interface';
import { AuthActionTypes, setAuthToLogout } from '~/src/store/actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { resendEmailVerification } from '~/src/utils/services/user-profile_service/resendEmailVerification.service';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';

interface ProfileSettingData extends Omit<UpdateProfileRequest, 'phone'> {
  phone: string;
}

export default function Profile() {
  const auth = useSelector((root: IRootReducer) => root.auth);
  const [loading, setLoading] = useState(true);
  const dispatch =
    useDispatch<ThunkDispatch<IRootReducer, any, AuthActionTypes>>();

  const [verify, setVerify] = useState(true);
  const [changeEmail, setChange] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  function toggleEmailChange() {
    setChange(!changeEmail);
    setIsEditable(!isEditable);
  }

  async function checkAvailability(
    property: CheckAvailabilityRequest['property'],
    value: CheckAvailabilityRequest['value']
  ) {
    if (value && value !== auth.user[property]) {
      const result = await checkAvailablity({ property, value });
      if (result.data.success) {
        return result.data.availablity;
      }
    }
    return true;
  }

  async function updateProfileData(values: ProfileSettingData) {
    await updateProfile({ ...values, phone: toNumber(values.phone) });
    formik.setSubmitting(false);
  }

  const LoginSchema = object({
    name: string().trim().required('Name is Required'),
    username: string()
      .trim()
      .matches(
        /^[0-9a-zA-Z_]+$/,
        'Only numbers, lower/upper case alphabets and underscore(_) is allowed'
      )
      .test({
        message: 'This username is already taken',
        test: async value => {
          return await checkAvailability('username', value);
        }
      })
      .required('Username cannot be empty'),
    phone: string()
      .trim()
      .matches(/^([0-9]{10}|[0-9]{12})$/, 'Phone number is not valid')
  });

  const emailForm = useFormik({
    initialValues: { email: '' },
    validationSchema: object({
      email: string()
        .trim()
        .email('Invalid Email address')
        .test({
          message: 'This email is already taken',
          test: async value => {
            return await checkAvailability('email', value);
          }
        })
        .required('Email is Required')
    }),
    onSubmit: async ({ email }, helpers) => {
      const result = await updateUserEmail({ email });
      helpers.setSubmitting(false);
      setVerify(result.data.result.email_verified);
      toggleEmailChange();
      dispatch(setAuthToLogout());
    }
  });

  const formik = useFormik<ProfileSettingData>({
    initialValues: {
      username: '',
      name: '',
      gender: '',
      academics: '',
      phone: ''
    },
    validationSchema: LoginSchema,
    onSubmit: updateProfileData
  });

  async function getData() {
    setLoading(true);
    const result = await getUserData2(
      auth.user.username,
      'name username email_verified academics email gender school college phone'
    );

    if (result.data.success) {
      formik.setValues({
        phone: result.data.user.phone?.toString(),
        academics: result.data.user.academics,
        gender: result.data.user.gender,
        name: result.data.user.name,
        username: result.data.user.username
      });
      emailForm.setValues({ email: result.data.user.email });
      setVerify(result.data.user.email_verified);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SettingScreenHeader title="Profile" />
      <ScrollView>
        {loading ? (
          <Loading />
        ) : (
          <View style={styles.headingview}>
            <View style={styles.header}>
              <SectionHeader label="General Information" />
              <TextInputWithLabel
                placeholder="Enter Your Name"
                label="Name"
                inputStyle={styles.emailTB}
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
                errorTxt={formik.touched.name && (formik.errors.name as string)}
                onBlur={formik.handleBlur('name')}
              />
              <TextInputWithLabel
                placeholder="Enter your Username"
                label="Username"
                inputStyle={styles.emailTB}
                onChangeText={formik.handleChange('username')}
                value={formik.values.username}
                errorTxt={
                  formik.touched.username && (formik.errors.username as string)
                }
                onBlur={formik.handleBlur('username')}
              />
              <TextInputWithLabel
                placeholder="Email"
                label="Email"
                inputStyle={isEditable ? styles.emailTB : styles.noteditable}
                onChangeText={emailForm.handleChange('email')}
                value={emailForm.values.email}
                errorTxt={
                  emailForm.touched.email && (emailForm.errors.email as string)
                }
                onBlur={emailForm.handleBlur('email')}
                editable={isEditable}
              />
              <View style={styles.instruction}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color={Black[600]}
                />
                <Text style={styles.instruction_msg}>
                  You will be logged out of your account if you change your
                  e-mail
                </Text>
              </View>
              {changeEmail ? (
                <Button
                  onPress={toggleEmailChange}
                  text="Change Email"
                  size="sm"
                />
              ) : (
                <View style={styles.emailUpdateActionsCt}>
                  <Button
                    onPress={emailForm.handleSubmit}
                    disabled={!emailForm.isValid || emailForm.isSubmitting}
                    processing={emailForm.isSubmitting}
                    text="Save Email"
                    size="sm"
                    type="filled"
                  />
                  <Button
                    onPress={toggleEmailChange}
                    btnStyle={{ marginLeft: 15 }}
                    text="Cancel"
                    size="sm"
                  />
                </View>
              )}
            </View>

            {!verify && (
              <EmailVerificationMessage email={emailForm.values.email} />
            )}
            <View style={styles.headerPersonel}>
              <SectionHeader label="Personal Information" />
              <SelectInput
                label="Gender"
                value={formik.values.gender}
                style={{ marginTop: 30 }}
                onValueChange={key => formik.setFieldValue('gender', key)}
                placeholder="Select Gender"
                selectOptions={{ male: 'Male', female: 'Female' }}
              />
              <TextInputWithLabel
                placeholder="Phone Number"
                label="Phone"
                inputStyle={styles.emailTB}
                keyboardType="phone-pad"
                onChangeText={formik.handleChange('phone')}
                value={formik.values.phone}
                errorTxt={
                  formik.touched.phone && (formik.errors.phone as string)
                }
                onBlur={formik.handleBlur('phone')}
              />
            </View>
            <View style={styles.headerEducation}>
              <SectionHeader label="Educational Detail" />
              <SelectInput
                label="Academics"
                value={formik.values.academics}
                style={{ marginTop: 30 }}
                onValueChange={key => formik.setFieldValue('academics', key)}
                placeholder="Select Academics"
                selectOptions={{
                  undergraduate: 'Undergraduate',
                  graduate: 'Graduate'
                }}
              />
            </View>
            <Button
              text="Update Profile"
              btnStyle={styles.updateBtn}
              type="filled"
              fullWidth={true}
              disabled={formik.isSubmitting}
              processing={formik.isSubmitting}
              onPress={formik.handleSubmit}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headingview: {
    padding: 20,
    paddingTop: 10
  },
  header: {
    marginBottom: 5
  },
  emailTB: {
    marginTop: '-5.5%'
  },
  instruction: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    flexDirection: 'row'
  },
  instruction_msg: {
    fontSize: 14,
    color: Black[600],
    marginLeft: 5
  },
  verify: {
    backgroundColor: Blue[50],
    padding: 10,
    marginTop: 15
  },
  resendview: {
    marginTop: 5
  },
  verifyinst: {
    color: 'black',
    lineHeight: 19,
    fontSize: 14
  },
  emailUpdateActionsCt: {
    flexDirection: 'row'
  },
  headerPersonel: {
    marginTop: '10%'
  },
  headerEducation: {
    marginTop: '8%'
  },
  updateBtn: { marginTop: 30 },
  noteditable: {
    marginTop: '-6%',
    backgroundColor: Black[200],
    paddingLeft: 10
  }
});

function EmailVerificationMessage(props: { email: string }) {
  const [loading, setLoading] = useState(false);

  async function resentEmailVerification() {
    setLoading(true);
    await resendEmailVerification(props.email);
    setLoading(false);
  }

  return (
    <View style={styles.verify}>
      <Text style={styles.verifyinst}>
        Please! Verify your email, We have sent you a verification email
      </Text>
      <Button
        text="Resend E-mail"
        btnStyle={styles.resendview}
        disabled={loading}
        processing={loading}
        size="sm"
        onPress={resentEmailVerification}
      />
    </View>
  );
}
