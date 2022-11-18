import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useRef, useState } from 'react';
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

function Header(props: { onInterestsAdded: () => void }) {
  const [submittingInterests, setSubmittingInterests] = useState(false);
  const [selectedCategories, { events }] = useInterestData(
    data => data.selectedCategories
  );
  const previousSelectionCount = useRef(-1);

  async function submitUserInterests() {
    setSubmittingInterests(true);
    const result = await addUserInterests(selectedCategories);

    if (result.data.success) {
      props.onInterestsAdded?.();
    }
    setSubmittingInterests(false);
  }

  useEffect(() => {
    // disable selection if selected interest reached limit of 5
    if (
      previousSelectionCount.current === 4 &&
      selectedCategories.length === 5
    ) {
      events.emit('interest-selection-toggle', false);
    }

    // enable selection if selected interest comes below limit of 5
    if (
      previousSelectionCount.current === 5 &&
      selectedCategories.length === 4
    ) {
      events.emit('interest-selection-toggle', true);
    }
    previousSelectionCount.current = selectedCategories.length;
  }, [selectedCategories]);

  return (
    <OptionalStackHeader
      skipable={false}
      onProceed={() => submitUserInterests()}
      disableProceed={submittingInterests || selectedCategories.length < 5}
      formStage={OptionalFormStage.INTERESTS_SELECTION}
    />
  );
}

function SearchInput() {
  const [_, { setSearchQuery }] = useInterestData(data => null);

  return (
    <Input
      style={styles.searchInputWrapper}
      inputContainer={styles.searchInputCt}
      inputProp={{
        onChangeText: debounce(setSearchQuery, 300),
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
  const navigation = useNavigation();

  return (
    <InterestSelectorDataProvider>
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
