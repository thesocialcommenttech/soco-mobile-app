import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ImageInputWithLabel from '../../components/createPost/imageInputWithLabel';
import { launchImageLibrary } from 'react-native-image-picker';
import TextInputWithLabel from '../../components/textInputWithLabel';

export default function Link() {
  const navigation = useNavigation();
  const [photoPath, setPhotoPath] = useState<any>();

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

  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon1 name="arrow-left" size={28} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.mheader}>Publish</Text>
      </View>
      <View style={styles.maincontent}>
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
          placeholder="Title"
          label="Title"
          inputStyle={styles.emailTB}
          // onChangeText={formik.handleChange('email')}
          // value={formik.values.email}
          // errorTxt={formik.touched.email && formik.errors.email}
          // onBlur={formik.handleBlur('email')}
        />
        <TextInputWithLabel
          placeholder="Link"
          label="Link"
          inputStyle={styles.emailTB}
          // onChangeText={formik.handleChange('email')}
          // value={formik.values.email}
          // errorTxt={formik.touched.email && formik.errors.email}
          // onBlur={formik.handleBlur('email')}
        />
        <TextInputWithLabel
          placeholder="Description of Link"
          label="Description"
          inputStyle={styles.descriptionTB}
          multiline={true}
          numberOfLines={5}
          maxLength={120}
          // onChangeText={formik.handleChange('email')}
          // value={formik.values.email}
          // errorTxt={formik.touched.email && formik.errors.email}
          // onBlur={formik.handleBlur('email')}
        />
        <TextInputWithLabel
          placeholder="Give Comma (,) separated tags"
          label="Tags"
          inputStyle={styles.emailTB}
          // onChangeText={formik.handleChange('email')}
          // value={formik.values.email}
          // errorTxt={formik.touched.email && formik.errors.email}
          // onBlur={formik.handleBlur('email')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '4.5%',
    justifyContent: 'space-between',
    paddingLeft: '2%',
    paddingRight: '2%'
  },
  mheader: {
    color: '#00A300',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginRight: '4%'
  },
  maincontent: {
    marginLeft: '4%',
    marginRight: '5%'
  },
  emailTB: {
    marginTop: '-6%',
    paddingLeft: 7
  },
  descriptionTB: {
    marginTop: '-6%',
    paddingLeft: 7,
    paddingTop: 7
  }
});
