import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
  Dimensions
} from 'react-native';
import React, { useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../../utils/colors';

export default function Kyc() {
  const B = props => <Text style={styles.bold}>{props.children}</Text>;
  const [filePath, setFilePath] = useState<any>();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [filePath1, setFilePath1] = useState<any>();

  const state: {
    name: string;
    pan: string;
    dob: string;
  } = {
    name: '',
    pan: '',
    dob: ''
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

  const panRegExp = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

  const LoginSchema = object().shape({
    name: string().required('Name is Required'),
    pan: string()
      .matches(panRegExp, 'Pan number is not valid')
      .required('Pan is Required'),
    dob: string().required('Date of Birth is Required')
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: LoginSchema,
    onSubmit: onLogin
  });

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const chooseFile = async type => {
    const options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath(response);
      });
    }
  };

  const chooseFile1 = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath1(response);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.boldtext}>KYC</Text>
      </View>
      <View style={styles.bottomruler} />
      <View style={styles.yellowbox}>
        <View style={styles.yellowicon}>
          <FontAwesomeIcon
            name="exclamation-triangle"
            size={22}
            color="black"
          />
        </View>
        <View style={styles.yellowins}>
          <Text style={styles.text}>
            Complete your KYC to activate your wallet and recieve referral
            credits.
          </Text>
        </View>
      </View>
      <View style={styles.whitebox}>
        <View style={styles.whiteicon}>
          <FontAwesomeIcon name="question-circle-o" size={27} color="black" />
        </View>
        <View style={styles.whiteins}>
          <Text style={styles.text}>
            All the information you provide will be used to verify your identity
            and should be as per mentioned on your <B>Pan</B>.
          </Text>
        </View>
      </View>
      <TextInputWithLabel
        placeholder="Name on Pan"
        label="Name"
        onBlur={formik.handleBlur('name')}
        inputStyle={styles.passTB}
        errorTxt={formik.touched.name && formik.errors.name}
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      <TextInputWithLabel
        placeholder="Pan Number"
        label="Pan Card"
        onBlur={formik.handleBlur('pan')}
        inputStyle={styles.passTB}
        errorTxt={formik.touched.pan && formik.errors.pan}
        value={formik.values.pan}
        onChangeText={formik.handleChange('pan')}
      />
      <TextInputWithLabel
        placeholder="dd/mm/yyyy"
        label="Date of Birth"
        onBlur={formik.handleBlur('dob')}
        inputStyle={styles.passTB}
        errorTxt={formik.touched.dob && formik.errors.dob}
        right={
          <TextInput.Icon
            color="black"
            name={'calendar'}
            onPress={() => {
              setOpen(true);
            }}
            style={styles.eye}
          />
        }
        value={date.toString()}
        onChangeText={formik.handleChange('password')}
      />
      <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={() => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.photo}>
        <View>
          <View style={styles.panview}>
            <Text style={styles.pantext}>Pan Front Image</Text>
          </View>
          <View style={styles.uploadBox}>
            {filePath
              ? [
                  <TouchableWithoutFeedback>
                    <View style={styles.imageview}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: filePath.assets[0].uri
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ]
              : [
                  <TouchableWithoutFeedback onPress={() => chooseFile('photo')}>
                    <View style={styles.grayBox}>
                      <Text>Upload Image</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ]}
          </View>
        </View>
        <View>
          <View style={styles.panview}>
            <Text style={styles.pantext}>Pan Back Image</Text>
          </View>
          <View style={styles.uploadBox}>
            {filePath1
              ? [
                  <TouchableWithoutFeedback>
                    <View style={styles.imageview}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: filePath1.assets[0].uri
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ]
              : [
                  <TouchableWithoutFeedback
                    onPress={() => chooseFile1('photo')}
                  >
                    <View style={styles.grayBox}>
                      <Text>Upload Image</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ]}
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {}}
          title="Upload KYC"
          color={Colors.Secondary}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2.5%',
    backgroundColor: 'white'
  },
  yellowbox: {
    backgroundColor: Colors.LightPrimary,
    flexDirection: 'row',
    padding: 8,
    marginTop: '3%'
  },
  yellowins: {
    flex: 1,
    marginLeft: '5%'
  },
  yellowicon: {
    alignSelf: 'center',
    marginLeft: '2%'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '900',
    color: 'black',
    fontSize: 17
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  whitebox: {
    flexDirection: 'row',
    padding: 8,
    marginTop: '3%'
  },
  whiteins: {
    flex: 1,
    marginLeft: '5%'
  },
  whiteicon: {
    alignSelf: 'center',
    marginLeft: '2%'
  },
  bold: {
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    color: 'black'
  },
  passTB: {
    marginTop: '-6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%'
  },
  photo: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between'
  },
  panview: {
    marginBottom: '-6%',
    alignSelf: 'center',
    zIndex: 9999,
    marginTop: '3%',
    backgroundColor: 'white'
  },
  uploadBox: {
    alignItems: 'center',
    padding: '2%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10
  },
  grayBox: {
    backgroundColor: 'lightgray',
    padding: '16.5%',
    borderRadius: 10,
    marginTop: '4%',
    marginLeft: '-7%',
    marginRight: '-7%',
    marginBottom: '3%'
  },
  pantext: {
    color: 'black',
    fontWeight: 'bold'
  },
  button: {
    marginTop: '5%',
    marginBottom: '7%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  image: {
    height: 0.14 * Dimensions.get('window').height,
    width: 0.38 * Dimensions.get('window').width
  },
  imageview: {
    marginTop: '1%',
    padding: 6
  }
});
