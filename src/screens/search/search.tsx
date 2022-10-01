import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import SearchBar from './searchBar';
import Results from './results';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Colors } from '../../utils/colors';
import DropdownSearch from '../../components/dropdownSearch';
import { searchUsername } from '~/src/utils/services/search_service/searchUsername.service';
import { debounce } from 'lodash';
import { searchPost } from '~/src/utils/services/search_service/searchPost.service';
import { SearchPostResponse } from '~/src/utils/typings/search_interface/searchPost.interface';
import { SearchUsernameResponse } from '~/src/utils/typings/search_interface/searchUsername.interface';
import { AxiosResponse } from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { App_ScreenProps } from '~/src/types/navigation/app';

const SearchScreen = ({
  navigation
}: {
  navigation: App_ScreenProps['navigation'];
}) => {
  const [searchPhrase, setSearchPhrase] = useState<string>(null);
  const [searchEntity, setSearchEntity] = useState<'users' | 'posts'>('users');
  const [searchResults, setSearchResults] = useState<
    SearchPostResponse['result'] | SearchUsernameResponse['result']
  >(null);
  const [loading, setLoading] = useState(false);

  const debouncedOnSearch = useMemo(
    () => debounce(setSearchPhrase, 300),
    [setSearchPhrase]
  );

  async function fetchSearchedQuery(query: string) {
    if (!query || query?.length < 3) {
      return;
    }

    setLoading(true);

    let result:
      | AxiosResponse<SearchUsernameResponse, any>
      | AxiosResponse<SearchPostResponse, any>;

    switch (searchEntity) {
      case 'users':
        result = await searchUsername(query);
        break;

      case 'posts':
        result = await searchPost(query);
        break;
    }

    if (result?.data.success) {
      setSearchResults(result.data.result);
    }

    setLoading(false);
  }

  useFocusEffect(() => {
    navigation.setOptions({
      title: 'Notifications',
      headerShown: true,
      headerShadowVisible: false,
      header: props => (
        <View style={styles.header}>
          <MaterialCommunityIcon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backIcon}
          />
          <SearchBar
            onSearchPhraseClear={() => {
              debouncedOnSearch(null);
            }}
            onSearchPhraseChange={debouncedOnSearch}
          />
        </View>
      )
    });
  });

  useEffect(() => {
    // canceling debouncing of onSearchPhraseChangehandler events
    // on this component unmont
    return () => {
      debouncedOnSearch.cancel();
    };
  }, []);

  // listening to changes in searchPhrase state
  useEffect(() => {
    fetchSearchedQuery(searchPhrase);
  }, [searchPhrase]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.util}>
          <Text style={styles.utilText}>Search For</Text>
          <DropdownSearch
            options={[
              { label: 'User', value: 'users' },
              { label: 'Post', value: 'posts' }
            ]}
            onSelectionChange={selection => {
              setSearchEntity(selection.value as any);
              setSearchPhrase(null);
              setSearchResults([]);
            }}
          />
        </View>
        {loading && (
          <View style={styles.loadingCt}>
            <ActivityIndicator size={24} color={Colors.Secondary} />
          </View>
        )}

        {/* helper hint when search phares is less than 3 characters */}
        {searchPhrase?.length < 3 && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.Gray100,
              marginTop: 10,
              borderRadius: 5
            }}
          >
            <MaterialCommunityIcon
              name="alert-circle-outline"
              size={20}
              color={Colors.Gray600}
            />
            <Text
              style={{
                padding: 10,
                textAlign: 'center',
                color: Colors.Gray600
              }}
            >
              Type at least 3 character
            </Text>
          </View>
        )}
      </View>
      {!loading && searchResults?.length > 0 && (
        <Results searchEntity={searchEntity} data={searchResults} />
      )}
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0
  },
  backIcon: {},
  util: {
    // marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  utilText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: Black[600]
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});
