import {
  Alert,
  Keyboard,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { TextInput as TI } from 'react-native-paper';
import ImageInputWithLabel from '../../../components/createPost/imageInputWithLabel';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddCertificate() {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const [yes1, setYes1] = useState(true);
  const [photoPath, setPhotoPath] = useState<any>();
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true
    });
  };

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

  const chooseImage = async type => {
    const options = {
      mediaType: type,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          Alert.alert('User cancelled Image picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Image not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setPhotoPath(response);
      });
    }
  };

  const func = () => {
    chooseImage('photo');
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    // dispatch(
    //   setUserDetails({
    //     ...state,
    //     dob: currentDate.toLocaleDateString()
    //   })
    // );
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.addcertificateview}>
            <View style={styles.addcertificateheader}>
              <Text style={styles.addcertificatetxt}>Add Certificate</Text>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon1 name="close" size={25} color="#C9D1D8" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.addexpdetails}>
              {photoPath
                ? [
                    <ImageInputWithLabel
                      label="Thumbnail"
                      func={func}
                      uri={photoPath.assets[0].uri}
                      // onChangeText={formik.handleChange('email')}
                      // value={formik.values.email}
                      // errorTxt={formik.touched.email && formik.errors.email}
                      // onBlur={formik.handleBlur('email')}
                    />
                  ]
                : [
                    <ImageInputWithLabel
                      label="Thumbnail"
                      func={func}
                      // onChangeText={formik.handleChange('email')}
                      // value={formik.values.email}
                      // errorTxt={formik.touched.email && formik.errors.email}
                      // onBlur={formik.handleBlur('email')}
                    />
                  ]}
              <TextInputWithLabel
                placeholder="Give Suitable Title"
                label="Title"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('username')}
                // value={formik.values.username}
                // errorTxt={formik.touched.username && formik.errors.username}
                // onBlur={formik.handleBlur('username')}
              />

              <TextInputWithLabel
                placeholder="Give Issuer institute name"
                label="Issuer Name"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('username')}
                // value={formik.values.username}
                // errorTxt={formik.touched.username && formik.errors.username}
                // onBlur={formik.handleBlur('username')}
              />

              <TextInputWithLabel
                placeholder="Give certificate id eg. ABCD1234X"
                label="Certificate Id"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('username')}
                // value={formik.values.username}
                // errorTxt={formik.touched.username && formik.errors.username}
                // onBlur={formik.handleBlur('username')}
              />

              <TextInputWithLabel
                placeholder="Give certificate url"
                label="Certificate Url"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('username')}
                // value={formik.values.username}
                // errorTxt={formik.touched.username && formik.errors.username}
                // onBlur={formik.handleBlur('username')}
              />

              <TextInputWithLabel
                placeholder="dd/mm/yyyy"
                label="Issue Date"
                inputStyle={styles.dobTB}
                //value={date.toLocaleDateString()}
                // errorTxt={formik.touched.dob && formik.errors.dob}
                // onBlur={formik.handleBlur('dob')}
                right={
                  <TI.Icon
                    color="#000"
                    name={'calendar-blank'}
                    style={styles.cal}
                    onPress={showDatepicker}
                  />
                }
                editable={false}
              />

              <View style={styles.labelBox}>
                <Text style={styles.label}>IS Expired</Text>
              </View>
              <View style={styles.selectionview}>
                <TouchableWithoutFeedback onPress={() => setYes1(true)}>
                  <View style={[yes1 ? styles.selectactive : styles.select]}>
                    <Text
                      style={[
                        yes1 ? styles.intextactive : styles.intextinactive
                      ]}
                    >
                      Yes
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setYes1(false)}>
                  <View style={[!yes1 ? styles.selectactive : styles.select]}>
                    <Text
                      style={[
                        !yes1 ? styles.intextactive : styles.intextinactive
                      ]}
                    >
                      No
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {!yes1
                ? []
                : [
                    <TextInputWithLabel
                      placeholder="dd/mm/yyyy"
                      label="Expiry Date"
                      inputStyle={styles.dobTB}
                      //value={date.toLocaleDateString()}
                      // errorTxt={formik.touched.dob && formik.errors.dob}
                      // onBlur={formik.handleBlur('dob')}
                      right={
                        <TI.Icon
                          color="#000"
                          name={'calendar-blank'}
                          style={styles.cal}
                          onPress={showDatepicker}
                        />
                      }
                      editable={false}
                    />
                  ]}
            </View>
            <View style={styles.button}>
              <TouchableWithoutFeedback>
                <Text style={styles.btnText}>Add</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addcertificateview: {
    backgroundColor: 'white',
    flex: 1
  },
  addcertificatetxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  addcertificateheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addexpdetails: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  selectionview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 15
  },
  select: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  intextinactive: {
    color: 'black'
  },
  intextactive: {
    color: 'black',
    fontWeight: 'bold'
  },
  selectactive: {
    borderColor: '#FFCA12',
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: '#FFF4CC',
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginTop: '4%'
  },
  dobTB: {
    marginTop: '-6%'
  },
  cal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emailTB: {
    marginTop: '-5.5%',
    paddingLeft: 10
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: '800',
    lineHeight: 14,
    fontStyle: 'normal',
    color: '#000',
    padding: '2%',
    marginBottom: '-3.5%',
    textTransform: 'uppercase'
  },
  labelBox: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: '9.5%',
    zIndex: 9999,
    marginTop: '3%',
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: '-1.5%'
  },
  button: {
    marginTop: '7%',
    marginBottom: '7%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '500'
  }
});
