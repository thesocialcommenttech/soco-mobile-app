import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Modal,
  Alert,
  TextInput,
  Platform,
  PermissionsAndroid,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../components/textInputWithLabel';
import { TextInput as Ti } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import CategoryList from '../../components/createPost/categoryList';
import ImageInputWithLabel from '../../components/createPost/imageInputWithLabel';
import VideoPlayer from 'react-native-video-controls';

const Data = [
  {
    id: 1,
    name: 'Science',
    selected: true
  },
  {
    id: 2,
    name: 'Astronomy',
    selected: true
  },
  {
    id: 3,
    name: 'Technology',
    selected: false
  },
  {
    id: 4,
    name: 'Information',
    selected: false
  },
  {
    id: 5,
    name: 'Tutorial',
    selected: false
  },
  {
    id: 6,
    name: 'Motivation',
    selected: false
  },
  {
    id: 7,
    name: 'General Information',
    selected: false
  }
];

export default function SkillVideo() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState<any>();
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
        console.log('Response = ', response);
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

  const chooseFile = async type => {
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
        console.log('Response = ', response);
        if (response.didCancel) {
          Alert.alert('User cancelled video picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Video not available on device');
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

  const func = () => {
    chooseImage('photo');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modaltopbar}>
              <Text style={styles.textStyle}>Select Category</Text>
              <TouchableWithoutFeedback
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Icon1 name="close" size={25} color="black" />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.searchbox}>
              <View style={styles.searchIcon}>
                <Icon1 name="magnify" size={20} color="#0063FF" />
              </View>
              <TextInput
                placeholder="Search Category Name"
                // onChangeText={text => {
                //   search(text);
                // }}
                style={styles.textinput}
                placeholderTextColor="#99969F"
              />
            </View>
            <View style={styles.list}>
              <FlatList
                data={Data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <CategoryList name={item.name} selected={item.selected} />
                )}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.flexrow}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon1 name="arrow-left" size={28} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.mheader}>Publish</Text>
      </View>
      <View style={styles.imageView}>
        {filePath
          ? [
              <View>
                <VideoPlayer
                  // ref={ref => (videoPlayer.current = ref)}
                  // repeat={true}
                  // paused={false}
                  source={{
                    uri: filePath.assets[0].uri
                  }}
                  disableBack={true}
                  style={styles.video}
                  //resizeMode={'cover'}
                  onEnterFullscreen={() => {
                    navigation.navigate(
                      'VideoPlayer' as never,
                      { uri: filePath.assets[0].uri } as never
                    );
                  }}
                />
              </View>
            ]
          : [
              <>
                <TouchableWithoutFeedback onPress={() => chooseFile('video')}>
                  <Icon1 name="video-outline" size={42} color="#BDBDBD" />
                </TouchableWithoutFeedback>
                <Text style={styles.selecttext}>Select Video</Text>
              </>
            ]}
      </View>

      <ScrollView>
        {filePath
          ? [
              <TouchableWithoutFeedback onPress={() => chooseFile('video')}>
                <Text style={styles.changev}>Change Video</Text>
              </TouchableWithoutFeedback>
            ]
          : []}
        <View style={styles.details}>
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
            placeholder="Description"
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

          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View>
              <TextInputWithLabel
                placeholder="Select Category"
                label="Category"
                inputStyle={styles.emailTB}
                // onChangeText={formik.handleChange('email')}
                // value={formik.values.email}
                // errorTxt={formik.touched.email && formik.errors.email}
                // onBlur={formik.handleBlur('email')}
                editable={false}
                right={
                  <Ti.Icon
                    color={'#BDBDBD'}
                    name={'chevron-down'}
                    style={styles.eye}
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback>
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
      </ScrollView>
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
    fontWeight: '600'
  },
  imageView: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    height: '42%',
    marginTop: '5%'
  },
  selecttext: {
    color: '#BDBDBD'
  },
  emailTB: {
    marginTop: '-6%',
    paddingLeft: 7
  },
  details: {
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingBottom: '4%'
  },
  descriptionTB: {
    marginTop: '-6%',
    paddingLeft: 7,
    paddingTop: 7
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    marginTop: '10%',
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  videomodalView: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  },
  textStyle: {
    color: 'black',
    fontWeight: '400',
    marginLeft: '2%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modaltopbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '2%',
    marginRight: '2%'
  },
  searchbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7D7987',
    marginTop: '7%',
    flexDirection: 'row',
    marginLeft: '3%',
    marginRight: '2%'
  },
  searchIcon: {
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '1.5%'
  },
  textinput: {
    color: 'black',
    marginTop: '0.5%'
  },
  list: {
    marginTop: '6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '-70%'
  },
  image: {
    height: 0.27 * Dimensions.get('window').height,
    width: 0.46 * Dimensions.get('window').width
  },
  video: {
    width: Dimensions.get('window').width
  },
  changev: {
    color: '#7D7987',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '3%',
    fontWeight: '600'
  },
  fullscreen: {
    zIndex: 9999,
    marginBottom: '-7.5%',
    marginLeft: '1%'
  }
});
