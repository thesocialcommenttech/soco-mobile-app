import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar';
import List from './list';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../utils/colors';
import DropdownSearch from '../../components/dropdownSearch';

const USERDATA = [
  {
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    profilePic:
      'https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=400x300'
  },
  {
    id: 2,
    name: 'Jane Doe',
    username: '@janedoe',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_X0ewLx_ib-tGZbmFDVI_n3dlRPMvyE4M7tR3NCDIe3RKqA2A8Rfd3OqGHMkut7_Bv0&usqp=CAU'
  },
  {
    id: 3,
    name: 'Luc Ganssou',
    username: '@lucganssou',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUYCA38C4qpg_fqsDKADrhvSVnUzvSyQKsms9pOQIug0BdfHE6hmFtNGWCBEHmzT6uW0M&usqp=CAU'
  },
  {
    id: 4,
    name: 'Carol Fusco',
    username: '@carolfusco',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSfrBRpbqQVTB0JLhJfmdCW4hgIdZquc3N3hM8XZ6nRTK4_5enf6usLcb8VKo7lfWUQFA&usqp=CAU'
  },
  {
    id: 5,
    name: 'Carol Fernandes',
    username: '@carolfernandes',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMsKVZFAS5gFvy-sg3l_ZVvt5xCLpM_Ocjg&usqp=CAU'
  },
  {
    id: 6,
    name: 'Carol Fernandes',
    username: '@carolfernandes',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRViCck0-66zUhbxsjl0iMB_LS6YiH31_PyWA&usqp=CAU'
  },
  {
    id: 7,
    name: 'Carol Fernandes',
    username: '@carolfernandes',
    profilePic:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-cYLPkSgMl2fIhKMTWe5JZefwBfMoVa2QA-mBpqp1kaB0SIlE8aAF5CES-6jBuOK_Mos&usqp=CAU'
  },
  {
    id: 8,
    name: 'Carol Fernandes',
    username: '@carolfernandes',
    profilePic:
      'https://bestprofilepictures.com/wp-content/uploads/2021/04/Awesome-Profile-Pic.jpg'
  }
];

const POSTDATA = [
  {
    id: 1,
    title: 'Annual security training is coming',
    username: '@carolfernandes'
  },
  {
    id: 2,
    title: 'NEW KITBASH IS OUT (CLEAN TOPOLOGY) !!!!!!',
    username: '@johndoe'
  },
  {
    id: 3,
    title: 'Training center important updates',
    username: '@carolfernandes'
  },
  {
    id: 4,
    title: 'My ETSY Store is now open',
    username: '@carolfernandes'
  },
  {
    id: 5,
    title: 'NEW RELEASE : Amazing doors Bundle pack V1.5',
    username: '@carolfernandes'
  },
  {
    id: 6,
    title: 'New PostProcess Tutorial + Sci-fi Character Case Study Breakdowns',
    username: '@carolfernandes'
  },
  {
    id: 7,
    title: 'Chrono Cross Harbor',
    username: '@carolfernandes'
  },
  {
    id: 8,
    title:
      'Customer stories - See how our products solve their problems in action',
    username: '@carolfernandes'
  }
];

const SearchScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('User');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcon
          name="arrow-left"
          size={25}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backIcon}
        />
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
      </View>
      <View style={styles.util}>
        <Text style={styles.utilText}>Search For</Text>
        <DropdownSearch label={selectedLabel} setLabel={setSelectedLabel} />
      </View>
      {!clicked ? (
        <></>
      ) : (
        <List
          label={selectedLabel}
          searchPhrase={searchPhrase}
          data={selectedLabel === 'User' ? USERDATA : POSTDATA}
          setClicked={setClicked}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
    paddingVertical: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backIcon: {
    // marginLeft: '5%',
    // backgroundColor: '#000'
  },
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  },
  util: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  utilText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  }
});
