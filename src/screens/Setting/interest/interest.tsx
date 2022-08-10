import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import Categorybox from '../../../components/settingsComponents/categoryBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../utils/colors';

const Data = [
  {
    id: 1,
    text: 'Computer Application'
  },
  {
    id: 2,
    text: 'Stats. Analysis'
  },
  {
    id: 3,
    text: 'Programming Language'
  },
  {
    id: 4,
    text: 'Software Engineering'
  },
  {
    id: 5,
    text: 'Technology'
  },
  {
    id: 6,
    text: 'Information Technology'
  }
];

const Data1 = [
  {
    id: 10,
    text: 'Stock Market'
  },
  {
    id: 11,
    text: 'Instrumentation Control'
  },
  {
    id: 12,
    text: 'Design Graphic'
  },
  {
    id: 13,
    text: 'Artificial Intelligence'
  },
  {
    id: 14,
    text: 'Robotics'
  },
  {
    id: 15,
    text: 'Social Science'
  },
  {
    id: 16,
    text: 'Machine Learning'
  },
  {
    id: 17,
    text: 'Pen and Ink'
  }
];

export default function Interest() {
  var components = [];
  var components1 = [];
  const navigation = useNavigation();
  const selectClose = data => {
    console.log(data);
  };

  const selectCategory = data => {
    console.log(data);
  };

  const search = text => {
    console.log(text);
  };
  if (!components1.length) {
    for (let i = 0; i < Data.length; i++) {
      components1.push(
        <Categorybox
          selectCategory={selectCategory}
          backgroundstyle={styles.backgroundstyle}
          textstyle={styles.textstyle}
          text={Data[i].text}
          cancel="True"
          selectClose={selectClose}
        />
      );
    }
  }

  if (!components.length) {
    for (let i = 0; i < Data1.length; i++) {
      components.push(
        <Categorybox
          selectCategory={selectCategory}
          backgroundstyle={styles.selectbackgroundstyle}
          textstyle={styles.selecttextstyle}
          text={Data1[i].text}
          cancel="False"
          selectClose={selectClose}
        />
      );
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flexrow}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Icon1 name="arrow-left" size={28} color="black" />
          </TouchableWithoutFeedback>
          <Text style={styles.mheader}>Interests</Text>
        </View>
        <View style={styles.fCont}>
          <Text style={styles.boldtext}>My Interests</Text>
          <Text style={styles.normaltext}>Total {Data.length} Interests</Text>
        </View>
        <View style={styles.selectedCategories}>{components1}</View>

        <View style={styles.addcategories}>
          <View style={styles.fCont}>
            <Text style={styles.boldtext}>Add Interests</Text>
            <Text style={styles.normaltext}>
              {10 - Data.length} selection Left
            </Text>
          </View>
          {/* <View style={styles.maximum}>
            <Text>Maximum 10 Interest can be selected</Text>
          </View> */}
          <View style={styles.searchbox}>
            <View style={styles.searchIcon}>
              <Icon name="search" size={15.5} color="#0063FF" />
            </View>
            <TextInput
              placeholder="Search"
              onChangeText={text => {
                search(text);
              }}
              placeholderTextColor="#99969F"
            />
          </View>
        </View>
        <View style={styles.allcategory}>{components}</View>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log('Button Pressed');
          }}
        >
          <View style={styles.updatebtn}>
            <Text style={styles.updatetxt}>Save</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: '4.5%',
    paddingRight: '4.5%',
    flex: 1,
    backgroundColor: 'white'
  },
  fCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    color: '#7D7987',
    lineHeight: 16,
    fontSize: 15
  },
  normaltext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    color: '#BDBDBD'
  },
  bottomruler: {
    borderBottomColor: Colors.BottomRulerColor,
    borderBottomWidth: 1,
    marginTop: '3%'
  },
  backgroundstyle: {
    backgroundColor: '#0063FF',
    alignSelf: 'center',
    paddingTop: 7,
    paddingLeft: 7,
    paddingBottom: 7,
    paddingRight: 3,
    borderRadius: 8,
    flexDirection: 'row'
  },
  textstyle: {
    color: 'white'
  },
  selectedCategories: {
    marginTop: '6%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  addcategories: {
    marginTop: '8%'
  },
  searchbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7D7987',
    marginTop: '7%',
    flexDirection: 'row'
  },
  allcategory: {
    marginTop: '3%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2
  },
  selectbackgroundstyle: {
    backgroundColor: Colors.LightSecondary,
    alignSelf: 'center',
    padding: 9,
    borderRadius: 10,
    marginLeft: '1.5%',
    marginBottom: '1%'
  },
  selecttextstyle: {
    color: '#0063FF'
  },
  updatebtn: {
    backgroundColor: '#0063FF',
    paddingTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium',
    borderRadius: 10,
    marginTop: '3%',
    width: '100%'
  },
  updatetxt: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 15
  },
  searchIcon: {
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '1.5%'
  },
  maximum: {
    marginTop: '1.5%'
  },
  flexrow: {
    flexDirection: 'row',
    marginBottom: '6%',
    marginLeft: '-1%',
    marginTop: '3%'
  },
  mheader: {
    color: 'black',
    marginLeft: '4%',
    fontSize: 18,
    fontWeight: '600',
    marginTop: '0.5%'
  }
});
