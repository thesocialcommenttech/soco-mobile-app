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
    text: 'Technology, Learning'
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
        <View style={styles.fCont}>
          <Text style={styles.boldtext}>My Interests</Text>
          <Text style={styles.normaltext}>Total {Data.length} Interests</Text>
        </View>
        <View style={styles.bottomruler} />
        <View style={styles.selectedCategories}>{components1}</View>

        <View style={styles.addcategories}>
          <View style={styles.fCont}>
            <Text style={styles.boldtext}>Add Interests</Text>
            <Text style={styles.normaltext}>
              {10 - Data.length} selection Left
            </Text>
          </View>
          <View style={styles.bottomruler} />
          <View style={styles.maximum}>
            <Text>Maximum 10 Interest can be selected</Text>
          </View>
          <View style={styles.searchbox}>
            <View style={styles.searchIcon}>
              <Icon name="search" size={15} color="#0063FF" />
            </View>
            <TextInput
              placeholder="Search Category Name"
              onChangeText={text => {
                search(text);
              }}
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
            <Text style={styles.updatetxt}>Update</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '7%',
    flex: 1
  },
  fCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boldtext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '900',
    color: 'black'
  },
  normaltext: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500'
  },
  bottomruler: {
    borderBottomColor: '#F0F2F5',
    borderBottomWidth: 1,
    marginTop: '3%'
  },
  backgroundstyle: {
    backgroundColor: '#1563E2',
    alignSelf: 'center',
    padding: 8,
    paddingRight: 3,
    borderRadius: 10,
    flexDirection: 'row'
  },
  textstyle: {
    color: 'white'
  },
  selectedCategories: {
    marginTop: '3%',
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  addcategories: {
    marginTop: '3%'
  },
  searchbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7D7987',
    marginTop: '1.5%',
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
    backgroundColor: '#E0EBFF',
    alignSelf: 'center',
    padding: 9,
    borderRadius: 10,
    marginLeft: '1.5%',
    marginBottom: '1%'
  },
  selecttextstyle: {
    color: '#1563E2'
  },
  updatebtn: {
    backgroundColor: '#1563E2',
    padding: 11,
    alignSelf: 'center',
    fontFamily: 'Roboto-Medium',
    borderRadius: 10,
    marginTop: '3%',
    width: '35%'
  },
  updatetxt: {
    color: 'white',
    alignSelf: 'center'
  },
  searchIcon: {
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '1.5%'
  },
  maximum: {
    marginTop: '1.5%'
  }
});
