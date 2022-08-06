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
import { Colors } from '../../utils/colors';
import Categorybox from '../../components/categoryBox';
import { getInterestCategories } from '~/src/utils/services/settings_services/interests_services/getInterestCategories.service';
import { Interests } from '~/src/utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';
import { addUserInterests } from '~/src/utils/services/user-profile_service/userInterests.service';
import {
  OptionalFormStage,
  OptionalStackHeader
} from '~/src/components/headers/OptionalStackHeader';
import { useNavigation } from '@react-navigation/native';

type SelectionCategory = Interests & { selected?: boolean };

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
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20
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
