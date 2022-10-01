// SearchBar.js
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';

function SearchBar({
  onSearchPhraseChange
}: {
  onSearchPhraseChange: (searchPhrase: string) => void;
  onSearchPhraseClear: () => void;
}) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const inputIsDirty = useMemo(() => searchPhrase?.length > 0, [searchPhrase]);

  return (
    <View
      style={[
        styles.searchBar,
        inputIsDirty ? styles.searchBar__clicked : styles.searchBar__unclicked
      ]}
    >
      <Ionicon name="search" size={20} color={Colors.Gray600} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={'#99969F'}
        value={searchPhrase}
        onChangeText={value => {
          setSearchPhrase(value);
          onSearchPhraseChange(value);
        }}
      />
      {inputIsDirty && (
        <MaterialCommunityIcon
          name="close"
          style={styles.searchBarClearBtn}
          size={20}
          color={Colors.Gray600}
          onPress={() => {
            onSearchPhraseChange('');
            Keyboard.dismiss();
          }}
        />
      )}
    </View>
  );
}
export default SearchBar;

// styles
const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    marginLeft: 15,
    paddingHorizontal: '4%',
    flexDirection: 'row',
    flexGrow: 1,
    borderRadius: 5,
    borderColor: Colors.GrayBorder,
    borderWidth: 1,
    alignItems: 'center',
    height: 45,
    position: 'relative'
  },
  searchBar__unclicked: {},
  searchBar__clicked: {},
  searchBarClearBtn: {},
  input: {
    fontSize: 14,
    marginLeft: 10,
    flexGrow: 1,
    color: 'black'
  }
});
