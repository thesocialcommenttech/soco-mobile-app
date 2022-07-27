import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

export default function AddSkill() {
  const navigation = useNavigation();
  const [value, setValue] = useState(40);
  const valuesetter = val => {
    setValue(val);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.addexperienceview}>
          <View style={styles.updatebioheader}>
            <Text style={styles.updatebiotxt}>Add Skill</Text>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
            <View style={styles.sliderview}>
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
                <Text style={styles.skillnumtext}>0</Text>
                <Text style={styles.numtext}>{Math.floor(value) / 10}</Text>
                <Text style={styles.skillnumtext}>10</Text>
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
  );
}

const styles = StyleSheet.create({
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
  }
});
