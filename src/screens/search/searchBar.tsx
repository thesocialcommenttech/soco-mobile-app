// SearchBar.js
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Text
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Ionicon name="search" size={15} color={Colors.Gray600} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={'#99969F'}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <MaterialCommunityIcon
            name="close"
            size={20}
            color={Colors.Gray600}
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        )}
      </View>
    </>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  searchBar__unclicked: {
    marginLeft: '4%',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    width: '88%',
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderColor: Colors.GrayBorder,
    borderWidth: 1,
    alignItems: 'center',
    height: 50
  },
  searchBar__clicked: {
    marginLeft: '4%',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    width: '88%',
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderColor: Colors.GrayBorder,
    borderWidth: 1,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '82%',
    color: 'black'
  }
});
