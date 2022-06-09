import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { Colors } from '../../utils/colors';
import Categorybox from '../../components/categoryBox';

const DATA = [
  {
    id: 1,
    text: 'Programming Language',
    selected: false
  },
  {
    id: 2,
    text: 'Stock Market',
    selected: false
  },
  {
    id: 3,
    text: 'Marketing',
    selected: false
  },
  {
    id: 4,
    text: 'Stock Market',
    selected: false
  },
  {
    id: 5,
    text: 'Instrumentation Control',
    selected: false
  },
  {
    id: 6,
    text: 'Design Graphic',
    selected: false
  },
  {
    id: 7,
    text: 'Artificial Intelligence',
    selected: false
  },
  {
    id: 8,
    text: 'Robotics',
    selected: false
  },
  {
    id: 9,
    text: 'Social Science',
    selected: false
  },
  {
    id: 10,
    text: 'Machine Learning',
    selected: false
  },
  {
    id: 11,
    text: 'Pen and Ink',
    selected: false
  },
  {
    id: 12,
    text: 'Data Science',
    selected: false
  },
  {
    id: 13,
    text: 'Artificial Intelligence',
    selected: false
  },
  {
    id: 14,
    text: 'Machine Learning',
    selected: false
  },
  {
    id: 15,
    text: 'Computer Vision',
    selected: false
  },
  {
    id: 16,
    text: 'Natural Language Processing',
    selected: false
  },
  {
    id: 17,
    text: 'Computer Systems',
    selected: false
  },
  {
    id: 18,
    text: 'Computer Application',
    selected: false
  }
];

const CategoriesScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [allComponents, setAllComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [data, setData] = useState(DATA);

  // if (!selectedComponents.length) {
  //   for (let i = 0; i < SelectedData.length; i++) {
  //     selectedComponents.push(
  //       <Categorybox
  //         selectCategory={selectCategory}
  //         backgroundstyle={styles.selectedBackgroundstyle}
  //         textstyle={styles.selectedTextstyle}
  //         text={SelectedData[i].text}
  //         cancel="True"
  //         selectClose={selectClose}
  //       />
  //     );
  //   }
  // }

  // if (!allComponents.length) {
  //   for (let i = 0; i < Data.length; i++) {
  //     allComponents.push(
  //       <Categorybox
  //         selectCategory={selectCategory}
  //         backgroundstyle={styles.backgroundstyle}
  //         textstyle={styles.textstyle}
  //         text={Data[i].text}
  //         cancel="False"
  //         selectClose={selectClose}
  //       />
  //     );
  //   }
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Select Categories of your interest</Text>
      <Text style={styles.subTitleTxt}>
        Tell us categories, you are interested in
      </Text>
      <Text style={styles.subsubTitleTxt}>Select minimum 5 categories</Text>
      {/* search bar */}
      <View style={styles.searchInput}>
        <TouchableOpacity style={styles.srchIcon}>
          <MaterialCommunityIcon
            name="magnify"
            size={25}
            color={Colors.Secondary}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.inputt}
          onChangeText={text => {
            setSearchText(text);
          }}
          value={searchText}
          placeholder={'Search'}
          placeholderTextColor={'gray'}
          spellCheck={false}
          autoCorrect={false}
          autoComplete="off"
          autoCapitalize="none"
        />
      </View>
      <ScrollView>
        <View style={styles.selectedCategories}>
          {data
            .filter((item, id) => item.selected === true)
            .map((item, id) => (
              <Categorybox
                key={id}
                backgroundstyle={styles.selectedBackgroundstyle}
                textstyle={styles.selectedTextstyle}
                text={item.text}
                cancel="True"
                obj={item}
                data={data}
                setData={setData}
              />
            ))}
        </View>
        <View style={styles.allcategory}>
          {data
            .filter((item, id) => item.selected === false)
            .map((item, id) => (
              <Categorybox
                key={id}
                backgroundstyle={styles.backgroundstyle}
                textstyle={styles.textstyle}
                text={item.text}
                cancel="False"
                obj={item}
                data={data}
                setData={setData}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '6%'
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.Black,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '2%'
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.Black,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '1%'
  },
  subsubTitleTxt: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium',
    fontStyle: 'normal',
    marginTop: '5%'
  },
  searchInput: {
    backgroundColor: 'white',
    marginTop: '4%',
    borderColor: Colors.GrayBorder,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: '2%',
    paddingRight: '2%',
    fontFamily: 'Roboto-Medium',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inputt: {
    width: '90%',
    color: 'black'
  },
  srchIcon: {
    alignItems: 'center',
    zIndex: 999,
    justifyContent: 'center'
  },
  backgroundstyle: {
    backgroundColor: Colors.LightSecondary,
    alignSelf: 'center',
    padding: '1%',
    borderRadius: 10
    // marginLeft: '1.5%'
    // marginBottom: '1%'
  },
  textstyle: {
    padding: '2%',
    color: Colors.Secondary
  },
  selectedBackgroundstyle: {
    backgroundColor: Colors.Secondary,
    alignSelf: 'flex-start',
    padding: '1%',
    // paddingRight: '4%',
    borderRadius: 10,
    flexDirection: 'row'
  },
  selectedTextstyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
    padding: '2%',
    fontStyle: 'normal'
  },
  selectedCategories: {
    marginTop: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  allcategory: {
    marginTop: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});
