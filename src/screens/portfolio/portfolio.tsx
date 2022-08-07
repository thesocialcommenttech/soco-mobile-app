import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Bio from './bio';
import Experiences from './experiences';
import Certifications from './certifications';
import Educations from './educations';
import Skills from './skills';
import Works from './works';
import Modal1 from 'react-native-modal';
import TextInputWithLabel from '../../components/textInputWithLabel';
import { TextInput as TI } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ImageInputWithLabel from '../../components/createPost/imageInputWithLabel';
import { launchImageLibrary } from 'react-native-image-picker';
import Slider from '@react-native-community/slider';
import AddWork from '../../components/portfolio/addWork';

const Tab = createMaterialTopTabNavigator();

export default function Portfolio() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Bio');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);
  const [modalVisible7, setModalVisible7] = useState(false);
  const [date, setDate] = useState(new Date());
  const [yes, setYes] = useState(true);
  const [yes1, setYes1] = useState(false);
  const [yes2, setYes2] = useState(true);
  const [photoPath, setPhotoPath] = useState<any>();
  const [value, setValue] = useState(40);
  const [sliderActive, setSliderActive] = useState(false);
  const [edunum, setEduNum] = useState(1);

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

  const activescreen = text => {
    setActiveTab(text);
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

  const left = (value * (Dimensions.get('window').width - 87)) / 100 - 15;

  const openModal = () => {
    if (activeTab === 'Experience') {
      navigation.navigate('Addexperience' as never, {} as never);
    } else if (activeTab === 'Certificates') {
      navigation.navigate('Addcertificate' as never, {} as never);
    } else if (activeTab === 'Skills') {
      navigation.navigate('Addskill' as never, {} as never);
    } else if (activeTab === 'Bio') {
      setModalVisible(true);
    } else if (activeTab === 'Education') {
      navigation.navigate('Addeducation' as never, {} as never);
    } else if (activeTab === 'Works') {
      setModalVisible7(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Modal1
          isVisible={modalVisible}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal1}
          onBackdropPress={() => setModalVisible(false)}
        >
          <>
            <View style={styles.optionview}>
              <TouchableWithoutFeedback
              // onPress={() => {
              //   chooseFile('photo');
              //   setModalVisible1(false);
              // }}
              >
                <View style={styles.modalrow}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('Updatebio' as never, {} as never);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optiontext}>Update Bio</Text>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.modalDelete}>
                  <TouchableWithoutFeedback>
                    <Text style={styles.optiontext}>
                      Update Social Accounts
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </>
        </Modal1>

        <Modal1
          isVisible={modalVisible7}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal1}
          onBackdropPress={() => setModalVisible7(false)}
        >
          <>
            <View style={styles.optionview}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('Addblog' as never, {} as never)
                }
              >
                <Text style={styles.workselectiontext}>Blog</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Artwork</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Article</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Skill Video</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Project</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Presentation</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Text style={styles.workselectiontext}>Link</Text>
              </TouchableWithoutFeedback>
            </View>
          </>
        </Modal1>

        <View style={styles.flexrow}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon1 name="arrow-left" size={28} color="black" />
          </TouchableWithoutFeedback>
          <Text style={styles.mheader}>Portfolio</Text>
          <View style={styles.plus}>
            <TouchableWithoutFeedback onPress={() => openModal()}>
              <Icon2 name="pluscircleo" size={25} color="black" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Tab.Navigator
          initialRouteName="Bio"
          // screenListeners={{
          //   tabBarOnPress: ({ e }) => {
          //     console.log('Before changing');
          //     console.log(activeTab);
          //     console.log(e);
          //     //setActiveTab(e.target);
          //     console.log('After changing');
          //     console.log(activeTab);
          //   }
          // }}
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarLabelStyle: { fontSize: 13 },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: '#BDBDBD',
            tabBarIndicatorStyle: {
              backgroundColor: '#0063FF',
              height: 1.5
            }
          }}
        >
          <Tab.Screen
            name="Bio"
            children={() => <Bio extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
          <Tab.Screen
            name="Experiences"
            children={() => <Experiences extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
          <Tab.Screen
            name="Certifications"
            children={() => <Certifications extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
          <Tab.Screen
            name="Educations"
            children={() => <Educations extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
          <Tab.Screen
            name="Skills"
            children={() => <Skills extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
          <Tab.Screen
            name="Works"
            children={() => <Works extraData={activescreen} />}
            // listeners={{
            //   tabPress: e => {
            //     const text = e.target;
            //     const str = text.substring(0, text.indexOf('-'));
            //     setActiveTab(str);
            //     console.log(activeTab);
            //   }
            // }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black'
  },
  flexrow: {
    flexDirection: 'row',
    marginTop: '4.5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    marginLeft: '2%',
    marginBottom: '4%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600'
  },
  plus: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: '2.5%',
    marginTop: '0.5%'
  },
  modal1: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0
  },
  modalrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  modalDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '4%',
    marginBottom: '2%',
    padding: '2%'
  },
  optionview: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 8
  },
  optiontext: {
    color: 'black',
    fontSize: 16,
    marginTop: '1.5%'
  },
  modal2: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  modal3: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  modal4: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    height: '100%'
  },
  updatebioview: {
    backgroundColor: 'white',
    flex: 1
  },
  updatebioheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updatebiotxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  textinput: {
    textAlign: 'left',
    textAlignVertical: 'top',
    paddingLeft: 20,
    fontSize: 16,
    color: 'black'
  },
  textinputview: {
    borderWidth: 1,
    borderColor: '#99969F',
    borderRadius: 5,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 25
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
  },
  addexperienceview: {
    backgroundColor: 'white',
    flex: 1
  },
  emailTB: {
    marginTop: '-5.5%',
    paddingLeft: 10
  },
  addexpdetails: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  descriptionTB: {
    marginTop: '-6%',
    paddingLeft: 7,
    paddingTop: 7
  },
  dobTB: {
    marginTop: '-6%'
  },
  cal: {
    justifyContent: 'center',
    alignItems: 'center'
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
  sliderview: {
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  slider: {
    marginLeft: 13,
    marginRight: 13
  },
  thumb: {
    height: 15,
    width: 15
  },
  activesliderview: {
    marginTop: '-0.2%',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  addeducationview: {
    backgroundColor: 'white',
    flex: 1
  },
  educationdetail: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  boxoutlineview: {
    marginTop: '-0.2%',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 15
  },
  edutext: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 21
  },
  eduactivetext: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21
  },
  eduview: {
    borderWidth: 2,
    borderColor: '#FFCA12',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '3%',
    backgroundColor: 'white'
  },
  eduactiveview: {
    borderWidth: 2,
    borderColor: '#FFCA12',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '3%',
    backgroundColor: '#FFF4CC'
  },
  skillnumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '9.5%',
    marginRight: '9%'
  },
  skillnumtext: {
    color: '#BDBDBD',
    fontSize: 16
  },
  numtext: {
    color: '#BDBDBD',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  sliderdesign: {
    height: 40
  },
  skillNumberview: {
    backgroundColor: '#E0EBFF',
    padding: 12,
    marginLeft: '2.2%'
  },
  extremeNumberview: {
    backgroundColor: '#F2F2F2',
    padding: 12
  },
  modal7: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
    backgroundColor: 'white'
  },
  workselectiontext: {
    color: 'black',
    fontSize: 16,
    marginTop: '4%',
    marginLeft: '8%',
    marginBottom: '3%'
  },
  addblogview: {
    flexDirection: 'row',
    marginTop: '3%',
    marginLeft: '1%',
    marginRight: '1%',
    justifyContent: 'space-between',
    flex: 1
  },
  addblogimage: {
    height: 80,
    width: 120,
    borderRadius: 7
  },
  addblogtext: {
    color: 'black',
    flexShrink: 1,
    width: 150,
    marginBottom: 5,
    marginLeft: '3%',
    lineHeight: 19,
    fontSize: 15
  },
  blogimageandtextview: {
    flexDirection: 'row'
  },
  addblogbutton: {
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#0063FF',
    borderRadius: 5,
    alignItems: 'center'
  }
});
