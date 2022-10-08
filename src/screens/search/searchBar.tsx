// SearchBar.js
import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Keyboard, LayoutRectangle } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Black, Colors } from '../../utils/colors';
import { Input } from '~/src/components/theme/Input';
import Button from '~/src/components/theme/Button';

function SearchBar(props: {
  onSearchPhraseChange: (searchPhrase: string) => void;
  onSearchPhraseClear: () => void;
}) {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const inputIsDirty = useMemo(() => searchPhrase?.length > 0, [searchPhrase]);
  const [textInputDim, setTextInputDim] = useState<LayoutRectangle>();

  return (
    <Input
      style={styles.searchbar}
      inputContainer={{
        paddingLeft: 15,
        ...(inputIsDirty && { paddingRight: 5 })
      }}
      inputProp={{
        placeholder: 'Search',
        value: searchPhrase,
        style: [
          styles.input,
          {
            ...(inputIsDirty &&
              textInputDim && { maxWidth: textInputDim.width })
          }
        ],
        onChangeText: value => {
          setSearchPhrase(value);
          props.onSearchPhraseChange(value);
        },
        onLayout: e => {
          setTextInputDim(e.nativeEvent.layout);
        }
      }}
      prefix={<Ionicon name="search" size={20} color={Black[600]} />}
      suffix={
        inputIsDirty && (
          <Button
            size="sm"
            btnStyle={styles.searchBarClearBtn}
            onPress={() => {
              setSearchPhrase(null);
            }}
          >
            <MaterialCommunityIcon
              name="close"
              style={styles.searchBarClearBtn}
              size={20}
              color={Black[600]}
            />
          </Button>
        )
      }
    />
  );
}
export default SearchBar;

// styles
const styles = StyleSheet.create({
  searchBarClearBtn: { alignSelf: 'center' },
  searchbar: { marginLeft: 5, flexGrow: 1 },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 10
  }
});
