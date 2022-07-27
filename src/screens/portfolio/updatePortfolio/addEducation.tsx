import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { TextInput as TI } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function AddEducation() {
  const navigation = useNavigation();
  const [edunum, setEduNum] = useState(1);
  const [date, setDate] = useState(new Date());
  const [yes2, setYes2] = useState(true);

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true
    });
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
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.addeducationview}>
          <View style={styles.addeducationheader}>
            <Text style={styles.addeducationtxt}>Add Education</Text>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                  style={[edunum === 1 ? styles.eduactiveview : styles.eduview]}
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
                  style={[edunum === 2 ? styles.eduactiveview : styles.eduview]}
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
                  style={[edunum === 3 ? styles.eduactiveview : styles.eduview]}
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
                <View style={[yes2 ? styles.selectactive : styles.select]}>
                  <Text
                    style={[yes2 ? styles.intextactive : styles.intextinactive]}
                  >
                    COMPLETED
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setYes2(false)}>
                <View style={[!yes2 ? styles.selectactive : styles.select]}>
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
  );
}

const styles = StyleSheet.create({
  addeducationheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addeducationtxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  addexpdetails: {
    marginLeft: '5%',
    marginRight: '5%'
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
  emailTB: {
    marginTop: '-5.5%',
    paddingLeft: 10
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
