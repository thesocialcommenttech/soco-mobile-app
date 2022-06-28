import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
  TextInput,
  Platform,
  PermissionsAndroid,
  Dimensions,
  FlatList,
  Modal,
  Image
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../components/textInputWithLabel';
import { TextInput as Ti } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import CategoryList from '../../components/createPost/categoryList';
import ImageInputWithLabel from '../../components/createPost/imageInputWithLabel';
import Modal1 from 'react-native-modal';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

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

let images = [];

export default function Presentation() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [photoPath, setPhotoPath] = useState<any>();
  const [modalVisible1, setModalVisible1] = useState(false);
  const scrollRef = React.useRef(null);
  const [index1, setIndex1] = useState(0);
  const [imagesarr, setImagesarr] = useState(images);

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
      launchImageLibrary(options, async response => {
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
        await setPhotoPath(response);
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
      launchImageLibrary(options, async response => {
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
        atLast(response);
      });
    }
  };

  const chooseIMG = async type => {
    const options = {
      mediaType: type,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, async response => {
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
        atPosition(response);
      });
    }
  };

  const func = () => {
    chooseImage('photo');
  };

  const atLast = response => {
    setImagesarr([...imagesarr, response.assets[0].uri]);
  };

  const atPosition = response => {
    images = imagesarr;
    images.splice(index1, 0, response.assets[0].uri);
    // setImagesarr(
    //   ...imagesarr.slice(0, index1),
    //   imgPath.assets[0].uri,
    //   ...imagesarr.slice(index1)
    // );
    setImagesarr(images);
  };

  const goToIndex = index => {
    scrollRef.current?.scrollToIndex({ index: index });
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

      <Modal1
        isVisible={modalVisible1}
        backdropColor="black"
        backdropOpacity={0.3}
        animationIn="slideInUp"
        style={styles.modal1}
        onBackdropPress={() => setModalVisible1(false)}
      >
        <View style={styles.optionview}>
          <TouchableWithoutFeedback
            onPress={() => {
              chooseFile('photo');
              setModalVisible1(false);
            }}
          >
            <Text style={styles.optiontext}>Append at Last</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Text
              style={styles.optiontext}
              onPress={() => {
                chooseIMG('photo');
                setModalVisible1(false);
              }}
            >
              Insert Here
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Modal1>

      <View style={styles.flexrow}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon1 name="arrow-left" size={28} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.mheader}>Publish</Text>
      </View>
      <View style={styles.imageView}>
        {imagesarr.length
          ? [
              <View>
                <SwiperFlatList
                  data={imagesarr}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={styles.imageComponent}
                    />
                  )}
                  onChangeIndex={({ index }) => {
                    setIndex1(index);
                  }}
                  ref={scrollRef}
                />
              </View>
            ]
          : [
              <View style={styles.noimageview}>
                <TouchableWithoutFeedback onPress={() => chooseFile('photo')}>
                  <Icon1 name="camera-outline" size={42} color="#BDBDBD" />
                </TouchableWithoutFeedback>
                <Text style={styles.selecttext}>Select Slide Image</Text>
              </View>
            ]}
      </View>

      <ScrollView>
        <View style={styles.slideacc}>
          <View style={styles.icon}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (index1 === 0) {
                  goToIndex(imagesarr.length - 1);
                } else {
                  goToIndex(index1 - 1);
                }
              }}
            >
              <Icon1 name="chevron-left" size={26} color="#7D7987" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.row}>
            <View style={styles.numview}>
              {imagesarr.length === 0
                ? [
                    <Text style={styles.number}>
                      {index1}/{imagesarr.length} |{' '}
                    </Text>
                  ]
                : [
                    <Text style={styles.number}>
                      {index1 + 1}/{imagesarr.length} |{' '}
                    </Text>
                  ]}
            </View>
            <TouchableWithoutFeedback onPress={() => setModalVisible1(true)}>
              <Text style={styles.addslide}> Add Slide</Text>
            </TouchableWithoutFeedback>
            <View style={styles.dropdown}>
              <TouchableWithoutFeedback onPress={() => setModalVisible1(true)}>
                <Icon1 name="chevron-down" size={20} color="#0063FF" />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.icon}>
            <TouchableWithoutFeedback
              onPress={() => {
                goToIndex((index1 + 1) % imagesarr.length);
              }}
            >
              <Icon1 name="chevron-right" size={26} color="#7D7987" />
            </TouchableWithoutFeedback>
          </View>
        </View>
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
    height: '40%',
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
  addslide: {
    color: '#0063FF',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '8%',
    fontWeight: '600'
  },
  fullscreen: {
    zIndex: 9999,
    marginBottom: '-7.5%',
    marginLeft: '1%'
  },
  slideacc: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginTop: '2%',
    marginLeft: '1.8%',
    marginRight: '1.8%'
  },
  row: {
    flexDirection: 'row'
  },
  dropdown: {
    marginTop: '10%',
    marginLeft: '2%'
  },
  number: {
    color: '#BDBDBD'
  },
  numview: {
    marginTop: '9.5%'
  },
  optionview: {
    height: '14%',
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    marginLeft: '6.2%',
    marginTop: '5%'
  },
  imageComponent: {
    height: 0.72 * Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  noimageview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
