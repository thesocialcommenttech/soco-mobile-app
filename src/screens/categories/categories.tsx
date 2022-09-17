import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useMemo, useState } from 'react';
import { Black, Colors } from '../../utils/colors';
import Categorybox from '../../components/categoryBox';
import { getInterestCategories } from '~/src/utils/services/settings_services/interests_services/getInterestCategories.service';
import { Interests } from '~/src/utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';
import { addUserInterests } from '~/src/utils/services/user-profile_service/userInterests.service';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import { useNavigation } from '@react-navigation/native';
import { Input } from '~/src/components/theme/Input';

export type SelectionCategory = Interests & { selected?: boolean };

function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const [submittingInterests, setSubmittingInterests] = useState(false);
  const [data, setData] = useState<SelectionCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const unselectedCategories = useMemo(
    () => data.filter(item => !item.selected),
    [data]
  );

  const selectedCategories = useMemo(
    () => data.filter(item => item.selected),
    [data]
  );

  async function fetchCategories() {
    setLoading(true);
    const result = await getInterestCategories();

    if (result.data.success) {
      setData(result.data.interest_categories);
    }
    setLoading(false);
  }

  async function submitUserInterests() {
    setSubmittingInterests(true);
    const result = await addUserInterests(selectedCategories);

    if (result.data.success) {
      navigation.navigate('ProfilePicture');
    }
    setSubmittingInterests(true);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <OptionalStackHeader
        skipable={false}
        onProceed={() => submitUserInterests()}
        disableProceed={submittingInterests || selectedCategories.length < 5}
        formStage={OptionalFormStage.INTERESTS_SELECTION}
      />
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Select Categories of your interest</Text>
        <Text style={styles.subTitleTxt}>
          Tell us categories, you are interested in
        </Text>
        {/* search bar */}
        <Input
          style={styles.searchInputWrapper}
          inputContainer={styles.searchInputCt}
          inputProp={{
            onChangeText: text => {
              setSearchText(text);
            },
            style: styles.searchInput,
            value: searchText,
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
        <Text style={styles.subsubTitleTxt}>Select minimum 5 categories</Text>
        {loading ? (
          <View style={styles.loadingCt}>
            <ActivityIndicator color={Colors.Secondary} size={32} />
          </View>
        ) : (
          <>
            {/* <ScrollView> */}
            {selectedCategories?.length > 0 && (
              <View style={styles.selectedCategories}>
                {selectedCategories.map((item, i) => (
                  <Categorybox
                    key={item._id}
                    text={item.category}
                    cancelable={true}
                    selected={true}
                    onCancel={() => {
                      data[item.index].selected = false;
                      setData([...data]);
                    }}
                  />
                ))}
              </View>
            )}
            {/* </ScrollView> */}
            {/* <View> */}
            <ScrollView
              contentContainerStyle={[
                styles.allcategory,
                selectedCategories?.length === 0 && { paddingTop: 10 }
              ]}
            >
              {unselectedCategories.map(item => (
                <Categorybox
                  key={item._id}
                  text={item.category}
                  selected={false}
                  onPress={() => {
                    data[item.index].selected = true;
                    // selectedCategories.push(item[0]);
                    setData([...data]);
                  }}
                />
              ))}
            </ScrollView>
            {/* </View> */}
          </>
        )}
      </View>
    </>
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
    marginTop: 20,
  },
  searchInputCt: {
    paddingLeft: 15,
    paddingRight: 15
  },
  selectedCategories: {
    // marginTop: '5%',
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  allcategory: {
    // marginTop: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingBottom: 10
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});
