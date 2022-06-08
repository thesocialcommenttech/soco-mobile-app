import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const [verify] = useState(true);
  const [change, setChange] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ]);
  const [isEditable, setIsEditable] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Graduate', value: 'Graduate' }
  ]);

  const toggleChange = () => {
    setChange(!change);
    setIsEditable(!isEditable);
  };

  const state: {
    username: string;
    name: string;
    email: string;
    gender: string;
    academics: string;
    phone: string;
  } = {
    username: '',
    name: '',
    email: 'kapadiatathya@gmail.com',
    gender: '',
    academics: '',
    phone: ''
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
    formikActions.setSubmitting(false);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = object().shape({
    email: string()
      .email('Invalid Email address')
      .required('Email is Required'),
    name: string().required('Name is Required'),
    username: string().required('Username cannot be empty'),
    phone: string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone is Required')
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: LoginSchema,
    onSubmit: onLogin
  });

  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon1 name="arrow-left" size={28} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.mheader}>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.headingview}>
          <View style={styles.header}>
            <View style={styles.refferals}>
              <Text style={styles.boldtext}>General Information</Text>
            </View>
            <TextInputWithLabel
              placeholder="Enter Your Name"
              label="Name"
              inputStyle={styles.emailTB}
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
              errorTxt={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur('name')}
            />
            <TextInputWithLabel
              placeholder="Enter your Username"
              label="Username"
              inputStyle={styles.emailTB}
              onChangeText={formik.handleChange('username')}
              value={formik.values.username}
              errorTxt={formik.touched.username && formik.errors.username}
              onBlur={formik.handleBlur('username')}
            />
            <TextInputWithLabel
              placeholder="Email"
              label="Email"
              inputStyle={isEditable ? styles.emailTB : styles.noteditable}
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              errorTxt={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur('email')}
              editable={isEditable}
            />
            <View style={styles.instruction}>
              <View style={styles.icon}>
                <Icon name="exclamationcircleo" size={16} />
              </View>
              <View style={styles.insview}>
                <Text style={styles.instext}>
                  You will be logged out of your account if you change your
                  e-mail
                </Text>
              </View>
            </View>
          </View>
          {change
            ? [
                <View style={styles.change}>
                  <TouchableOpacity onPress={toggleChange}>
                    <Text style={styles.changetext}>Change Email</Text>
                  </TouchableOpacity>
                </View>
              ]
            : [
                <>
                  <View style={styles.row}>
                    <View style={styles.save}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('Save E-mail Pressed');
                        }}
                      >
                        <Text style={styles.savetext}>Save Email</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cancel}>
                      <TouchableOpacity onPress={toggleChange}>
                        <Text style={styles.canceltext}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ]}

          {verify
            ? []
            : [
                <View style={styles.verify}>
                  <View>
                    <Text style={styles.verifyinst}>
                      Please! Verify your email, We have sent you a verification
                      email
                    </Text>
                  </View>
                  <View style={styles.resendview}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('Resend Email Pressed');
                      }}
                    >
                      <Text style={styles.resend}>Resend E-mail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ]}
          <View style={styles.headerPersonel}>
            <View style={styles.refferals}>
              <Text style={styles.boldtext}>Personal Information</Text>
            </View>
            <View style={styles.genderview}>
              <Text style={styles.gendertext}>Gender</Text>
            </View>
            <DropDownPicker
              open={open}
              value={formik.values.gender ? formik.values.gender : value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.dropdown}
              placeholderStyle={styles.placeHolder}
            />
            <TextInputWithLabel
              placeholder="Phone Number"
              label="Phone"
              inputStyle={styles.emailTB}
              onChangeText={formik.handleChange('phone')}
              value={formik.values.phone}
              errorTxt={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur('phone')}
            />
          </View>
          <View style={styles.headerEducation}>
            <View style={styles.refferals}>
              <Text style={styles.boldtext}>Educational Detail</Text>
            </View>
            <View style={styles.genderview}>
              <Text style={styles.gendertext}>Academics</Text>
            </View>
            <DropDownPicker
              open={open1}
              value={formik.values.academics ? formik.values.academics : value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              style={styles.dropdown}
              placeholderStyle={styles.placeHolder}
            />
          </View>
          <View style={styles.button}>
            <TouchableWithoutFeedback>
              <Text style={styles.btnText}>Update Profile</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '4%',
    marginRight: '4%'
  },
  heading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  headingview: {
    marginTop: '4.5%',
    marginLeft: '2%'
  },
  header: {
    marginTop: '0%',
    marginBottom: '-2%',
    marginLeft: '1.5%',
    marginRight: '2%'
  },
  emailTB: {
    marginTop: '-5.5%',
    paddingLeft: 10
  },
  instruction: {
    marginTop: '2%',
    marginLeft: '0.5%',
    flexDirection: 'row',
    marginRight: '1%'
  },
  instext: {
    fontSize: 15
  },
  insview: {
    marginLeft: '1%'
  },
  icon: {
    marginTop: '1.5%'
  },
  change: {
    marginTop: '4.5%',
    marginLeft: '3%'
  },
  changetext: {
    fontSize: 16,
    color: '#0063FF',
    fontWeight: 'bold'
  },
  verify: {
    justifyContent: 'space-between',
    backgroundColor: '#E0EBFF',
    padding: 11,
    marginTop: '2%',
    marginLeft: '1%',
    marginRight: '2%'
  },
  resend: {
    color: '#0063FF',
    fontSize: 16
  },
  resendview: {
    marginTop: '1.5%'
  },
  verifyinst: {
    color: 'black',
    lineHeight: 19,
    fontSize: 16
  },
  save: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#0063FF',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: '2%',
    backgroundColor: '#E0EBFF'
  },
  savetext: {
    color: '#0063FF',
    fontSize: 16
  },
  cancel: {
    padding: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginLeft: '2.5%'
  },
  canceltext: {
    color: '#0063FF',
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    marginTop: '6%'
  },
  headerPersonel: {
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  genderview: {
    backgroundColor: 'white',
    zIndex: 9999,
    alignSelf: 'flex-start',
    padding: 6,
    marginBottom: '-4.5%',
    marginLeft: '10%',
    marginTop: '3.5%',
    paddingLeft: 10,
    paddingRight: 10
  },
  gendertext: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  dropdown: {
    borderColor: 'lightgray',
    paddingLeft: 22,
    paddingTop: 17,
    paddingBottom: 17
  },
  headerEducation: {
    marginTop: '8%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  button: {
    marginTop: '7%',
    marginBottom: '7%',
    marginLeft: '2%',
    marginRight: '2%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 8,
    alignItems: 'center'
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    color: 'gray',
    fontSize: 16
  },
  refferals: {
    marginTop: '2.5%'
  },
  noteditable: {
    marginTop: '-6%',
    backgroundColor: '#F2F2F2',
    paddingLeft: 10
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  },
  placeHolder: {
    color: '#99969F',
    fontSize: 16
  },
  flexrow: {
    flexDirection: 'row',
    marginLeft: '2%',
    marginTop: '3%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginTop: '0.5%'
  }
});
