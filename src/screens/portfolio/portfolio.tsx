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
  Dimensions
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

  const valuesetter = val => {
    setValue(val);
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
      setModalVisible2(true);
    } else if (activeTab === 'Certificates') {
      setModalVisible3(true);
    } else if (activeTab === 'Skills') {
      setModalVisible4(true);
    } else if (activeTab === 'Bio') {
      setModalVisible(true);
    } else if (activeTab === 'Education') {
      setModalVisible5(true);
    } else if (activeTab === 'Works') {
      setModalVisible6(true);
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
                      setModalVisible1(true);
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
          isVisible={modalVisible1}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal2}
          onBackdropPress={() => setModalVisible1(false)}
        >
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.updatebioview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Update Bio</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible1(false)}
                  >
                    <Icon1 name="close" size={25} color="#C9D1D8" />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.textinputview}>
                  <TextInput
                    style={styles.textinput}
                    placeholder={'Write about yourself'}
                    numberOfLines={8}
                    multiline={true}
                    placeholderTextColor="#99969F"
                  />
                </View>
                <View style={styles.button}>
                  <TouchableWithoutFeedback>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        </Modal1>

        <Modal1
          isVisible={modalVisible2}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal2}
          onBackdropPress={() => setModalVisible2(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={styles.addexperienceview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Add Experience</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible2(false)}
                  >
                    <Icon1 name="close" size={25} color="#C9D1D8" />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.addexpdetails}>
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
                    placeholder="Company Name"
                    label="Company"
                    inputStyle={styles.emailTB}
                    // onChangeText={formik.handleChange('username')}
                    // value={formik.values.username}
                    // errorTxt={formik.touched.username && formik.errors.username}
                    // onBlur={formik.handleBlur('username')}
                  />

                  <View style={styles.labelBox}>
                    <Text style={styles.label}>Currently Working</Text>
                  </View>
                  <View style={styles.selectionview}>
                    <TouchableWithoutFeedback onPress={() => setYes(true)}>
                      <View style={[yes ? styles.selectactive : styles.select]}>
                        <Text
                          style={[
                            yes ? styles.intextactive : styles.intextinactive
                          ]}
                        >
                          Yes
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setYes(false)}>
                      <View
                        style={[!yes ? styles.selectactive : styles.select]}
                      >
                        <Text
                          style={[
                            !yes ? styles.intextactive : styles.intextinactive
                          ]}
                        >
                          No
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>

                  <TextInputWithLabel
                    placeholder="dd/mm/yyyy"
                    label="Start Date"
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
                  {yes
                    ? []
                    : [
                        <TextInputWithLabel
                          placeholder="dd/mm/yyyy"
                          label="End Date"
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
                  <TextInputWithLabel
                    placeholder="Write about your Job, description should be short and up to the point"
                    label="Description"
                    inputStyle={styles.descriptionTB}
                    multiline={true}
                    numberOfLines={7}
                    maxLength={250}
                    // onChangeText={formik.handleChange('email')}
                    // value={formik.values.email}
                    // errorTxt={formik.touched.email && formik.errors.email}
                    // onBlur={formik.handleBlur('email')}
                  />
                </View>
                <View style={styles.button}>
                  <TouchableWithoutFeedback>
                    <Text style={styles.btnText}>Add</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </Modal1>

        <Modal1
          isVisible={modalVisible3}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal3}
          onBackdropPress={() => setModalVisible3(false)}
        >
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.addexperienceview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Add Certificate</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible3(false)}
                  >
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
                      <View
                        style={[yes1 ? styles.selectactive : styles.select]}
                      >
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
                      <View
                        style={[!yes1 ? styles.selectactive : styles.select]}
                      >
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
        </Modal1>

        <Modal1
          isVisible={modalVisible4}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal4}
          onBackdropPress={() => setModalVisible4(false)}
        >
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.addexperienceview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Add Skill</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible4(false)}
                  >
                    <Icon1 name="close" size={25} color="#C9D1D8" />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.addexpdetails}>
                  <TextInputWithLabel
                    placeholder="Give suitable title"
                    label="Title"
                    inputStyle={styles.emailTB}
                    // onChangeText={formik.handleChange('username')}
                    // value={formik.values.username}
                    // errorTxt={formik.touched.username && formik.errors.username}
                    // onBlur={formik.handleBlur('username')}
                  />
                  <View style={styles.labelBox}>
                    <Text style={styles.label}>SKILL Level</Text>
                  </View>
                  <View
                    style={[
                      sliderActive ? styles.activesliderview : styles.sliderview
                    ]}
                  >
                    <View style={styles.slider}>
                      <Slider
                        style={styles.sliderdesign}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#0063FF"
                        maximumTrackTintColor="#DCDCDC"
                        thumbTintColor="#0063FF"
                        onValueChange={val => valuesetter(val)}
                        step={5}
                      />
                    </View>
                    <View style={styles.skillnumber}>
                      <View style={styles.extremeNumberview}>
                        <Text style={styles.skillnumtext}>0</Text>
                      </View>
                      <View style={styles.skillNumberview}>
                        <Text style={styles.numtext}>
                          {Math.floor(value) / 10}
                        </Text>
                      </View>
                      <View style={styles.extremeNumberview}>
                        <Text style={styles.skillnumtext}>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.button}>
                  <TouchableWithoutFeedback>
                    <Text style={styles.btnText}>Add</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        </Modal1>

        <Modal1
          isVisible={modalVisible5}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal4}
          onBackdropPress={() => setModalVisible5(false)}
        >
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.addeducationview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Add Education</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible5(false)}
                  >
                    <Icon1 name="close" size={25} color="#C9D1D8" />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.educationdetail}>
                  <TextInputWithLabel
                    placeholder="Name of your Institute"
                    label="Institute Name"
                    inputStyle={styles.emailTB}
                    // onChangeText={formik.handleChange('username')}
                    // value={formik.values.username}
                    // errorTxt={formik.touched.username && formik.errors.username}
                    // onBlur={formik.handleBlur('username')}
                  />

                  <TextInputWithLabel
                    placeholder="Eg. 10th, 12th, B.Tech"
                    label="Course"
                    inputStyle={styles.emailTB}
                    // onChangeText={formik.handleChange('username')}
                    // value={formik.values.username}
                    // errorTxt={formik.touched.username && formik.errors.username}
                    // onBlur={formik.handleBlur('username')}
                  />

                  <View style={styles.labelBox}>
                    <Text style={styles.label}>EDUCATION LEVEL</Text>
                  </View>

                  <View style={styles.boxoutlineview}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setEduNum(1);
                      }}
                    >
                      <View
                        style={[
                          edunum === 1 ? styles.eduactiveview : styles.eduview
                        ]}
                      >
                        <Text
                          style={[
                            edunum === 1 ? styles.eduactivetext : styles.edutext
                          ]}
                        >
                          Schooling
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setEduNum(2);
                      }}
                    >
                      <View
                        style={[
                          edunum === 2 ? styles.eduactiveview : styles.eduview
                        ]}
                      >
                        <Text
                          style={[
                            edunum === 2 ? styles.eduactivetext : styles.edutext
                          ]}
                        >
                          Graduation
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setEduNum(3);
                      }}
                    >
                      <View
                        style={[
                          edunum === 3 ? styles.eduactiveview : styles.eduview
                        ]}
                      >
                        <Text
                          style={[
                            edunum === 3 ? styles.eduactivetext : styles.edutext
                          ]}
                        >
                          Post Graduation
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.labelBox}>
                    <Text style={styles.label}>STATUS</Text>
                  </View>
                  <View style={styles.selectionview}>
                    <TouchableWithoutFeedback onPress={() => setYes2(true)}>
                      <View
                        style={[yes2 ? styles.selectactive : styles.select]}
                      >
                        <Text
                          style={[
                            yes2 ? styles.intextactive : styles.intextinactive
                          ]}
                        >
                          COMPLETED
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setYes2(false)}>
                      <View
                        style={[!yes2 ? styles.selectactive : styles.select]}
                      >
                        <Text
                          style={[
                            !yes2 ? styles.intextactive : styles.intextinactive
                          ]}
                        >
                          PURSUING
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {yes2
                    ? []
                    : [
                        <TextInputWithLabel
                          placeholder="dd/mm/yyyy"
                          label="Passout Year"
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
          </>
        </Modal1>

        <Modal1
          isVisible={modalVisible6}
          backdropColor="black"
          backdropOpacity={0.3}
          animationIn="slideInUp"
          style={styles.modal4}
          onBackdropPress={() => setModalVisible6(false)}
        >
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.addeducationview}>
                <View style={styles.updatebioheader}>
                  <Text style={styles.updatebiotxt}>Add Blog</Text>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible6(false)}
                  >
                    <Icon1 name="close" size={25} color="#C9D1D8" />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
              <TouchableWithoutFeedback>
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
    flex: 1
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
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  numtext: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold'
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
  }
});
