import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useCallback, useEffect, useState } from 'react';
import { Black, Colors } from '../../utils/colors';
import { addUserInterests } from '~/src/utils/services/user-profile_service/userInterests.service';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import { useNavigation } from '@react-navigation/native';
import { Input } from '~/src/components/theme/Input';
import { AvailableInterestList } from '~/src/components/Interests/AvialableInterests';
import {
  InterestSelectorDataProvider,
  useInterestData
} from '~/src/state/InterestSelectorState';
import { SelectedInterests } from '~/src/components/Interests/SelectedInterests';
import { debounce } from 'lodash';
import { IPostRegisterPageScreenProps } from '~/src/types/navigation/post-register';

function Header(props: { onInterestsAdded: () => void }) {
  const [submittingInterests, setSubmittingInterests] = useState(false);
  const [availableSelection, { events, getStore }] = useInterestData(
    data => data.availableSelection
  );

  async function submitUserInterests() {
    setSubmittingInterests(true);
    const result = await addUserInterests(getStore().selectedCategories);

    if (result.data.success) {
      props.onInterestsAdded?.();
    }
    setSubmittingInterests(false);
  }

  useEffect(() => {
    // disable selection if available selection is = 0
    if (availableSelection <= 0) {
      events.emit('interest-selection-toggle', false);
    } else {
      // enable selection if available selection is > 0
      events.emit('interest-selection-toggle', true);
    }
  }, [availableSelection]);

  return (
    <OptionalStackHeader
      skipable={false}
      onProceed={() => submitUserInterests()}
      disableProceed={submittingInterests || availableSelection > 0}
      formStage={OptionalFormStage.INTERESTS_SELECTION}
    />
  );
}

function SearchInput() {
  const [_, { setSearchQuery }] = useInterestData(() => null);

  const debouncedSearch = useCallback(debounce(setSearchQuery, 300), [
    setSearchQuery
  ]);

  return (
    <Input
      style={styles.searchInputWrapper}
      inputContainer={styles.searchInputCt}
      inputProp={{
        onChangeText: debouncedSearch,
        style: styles.searchInput,
        // value: searchQuery,
        placeholder: 'Search',
        spellCheck: false,
        autoCorrect: false,
        autoComplete: 'off',
        autoCapitalize: 'none'
      }}
      prefix={
        <MaterialCommunityIcon
          name="magnify"
          size={20}
          color={Colors.Secondary}
        />
      }
    />
  );
}

function CategoriesScreen() {
  const navigation =
    useNavigation<IPostRegisterPageScreenProps<'Categories'>['navigation']>();

  return (
    <InterestSelectorDataProvider maxAllowedSelection={5}>
      <Header onInterestsAdded={() => navigation.navigate('ProfilePicture')} />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Select Categories of your interest</Text>
        <Text style={styles.subTitleTxt}>
          Tell us categories, you are interested in
        </Text>
        {/* search bar */}
        <SearchInput />
        <Text style={styles.subsubTitleTxt}>
          Select 5 categories of interest
        </Text>
        <View style={{ marginTop: 10, flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 10
            }}
          >
            <SelectedInterests />
            <AvailableInterestList />
          </ScrollView>
        </View>
      </View>
    </InterestSelectorDataProvider>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  titleTxt: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Roboto-Medium'
    // marginTop: 10
  },
  subTitleTxt: {
    color: 'black',
    marginTop: 5
  },
  subsubTitleTxt: {
    color: Black[600],
    marginTop: 5,
    marginBottom: 5
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 10
  },
  searchInputWrapper: {
    marginTop: 20
  },
  searchInputCt: {
    paddingLeft: 15,
    paddingRight: 15
  }
});
