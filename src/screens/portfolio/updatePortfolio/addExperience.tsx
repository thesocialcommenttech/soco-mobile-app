import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { TextInput as TI } from 'react-native-paper';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function AddExperience() {
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const [yes, setYes] = useState(true);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.addexperienceview}>
          <View style={styles.addexpheader}>
            <Text style={styles.addexptxt}>Add Experience</Text>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                    style={[yes ? styles.intextactive : styles.intextinactive]}
                  >
                    Yes
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setYes(false)}>
                <View style={[!yes ? styles.selectactive : styles.select]}>
                  <Text
                    style={[!yes ? styles.intextactive : styles.intextinactive]}
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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  addexpview: {
    backgroundColor: 'white',
    flex: 1
  },
  addexptxt: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500'
  },
  addexpheader: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
