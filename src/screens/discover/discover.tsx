import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import TopBar from '../../components/topBar';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Avatar, Card } from '@rneui/base';
import { TextInput } from 'react-native';
import { Colors } from '../../utils/colors';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { getDiscoveredPosts } from '~/src/utils/services/getDiscoveredUsers_service/getDiscoveredUsers.service';
import { PostType } from '~/src/utils/typings/post';
import { GetDiscoveredPostsResponse } from '~/src/utils/typings/getDiscoveredUsers_interface/getDiscoveredUsers.interface';
import { staticFileSrc } from '~/src/utils/methods';
import Post from '~/src/components/Post';
import { ActivityIndicator } from 'react-native-paper';
import { debounce } from 'lodash';

const PostTypeFilterOption = ({
  label,
  isSelected,
  onPress
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const selected = useMemo(() => isSelected, [isSelected]);

  return (
    <TouchableOpacity
      style={[styles.item, selected && styles.itemSelected]}
      onPress={() => {
        onPress();
        // setSelected(!selected);
      }}
    >
      <Text style={[styles.itemText, selected && styles.itemTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

function DiscoverScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<GetDiscoveredPostsResponse['posts']>([]);
  const [loading, setLoading] = useState(true);
  const [postTypeFilter, setPostTypeFilter] = useState<PostType | ''>('');
  const [pageState, setPageState] = useState<{
    pageNo: number;
    pageSize: number;
  }>({
    pageNo: 0,
    pageSize: 20
  });

  const debouncedOnSearch = useMemo(
    () => debounce(setSearchText, 300),
    [setSearchText]
  );

  async function fetchData() {
    setLoading(true);
    const result = await getDiscoveredPosts({
      pageNo: pageState.pageNo,
      size: pageState.pageSize,
      type: postTypeFilter,
      proj: 'shares views description postedOn postType featureImage title comments upvotes totalSlides'
    });

    if (result.data.success) {
      setPosts([...posts,...result.data.posts]);
    }
    //console.log(result);
    setLoading(false);
  }

  useEffect(() => {
    // canceling debouncing of onSearchTextChange events
    // on this component unmont
    return () => {
      debouncedOnSearch.cancel();
    };
  }, []);

  // listening to changes in searchText state
  // useEffect(() => {
  //   // fetch result for the input search query
  //   fetchSearchedQuery(searchText);
  // }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [pageState, postTypeFilter]);

  const postTypeFilterOptions: {
    value: PostType | '';
    label: string;
  }[] = [
    {
      value: '',
      label: 'All'
    },
    {
      value: 'blog',
      label: 'Blogs'
    },
    {
      value: 'artwork',
      label: 'Artworks'
    },
    {
      value: 'skill',
      label: 'Videos'
    },
    {
      value: 'project',
      label: 'Projects'
    },
    {
      value: 'presentation',
      label: 'Presentations'
    },
    {
      value: 'article',
      label: 'Articles'
    },
    {
      value: 'link',
      label: 'Links'
    }
  ];

  return (
    <ScreenWithTopBar navigation={navigation}>
      <>
        {/* <View style={styles.searchInput}>
          <TextInput
            style={styles.inputt}
            onChangeText={debouncedOnSearch}
            value={searchText}
            placeholder={'Search'}
            placeholderTextColor={'gray'}
            spellCheck={false}
            autoCorrect={false}
            autoComplete="off"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.filtIcon}>
            <MaterialCommunityIcon
              name="filter-outline"
              size={25}
              color={Colors.Secondary}
            />
          </TouchableOpacity>
        </View> */}
        <ScrollView style={styles.activity} horizontal={true}>
          {postTypeFilterOptions.map((item, i) => (
            <>
              <PostTypeFilterOption
                key={i}
                label={item.label}
                isSelected={postTypeFilter === item.value}
                onPress={() => setPostTypeFilter(item.value)}
              />
            </>
          ))}
          <View style={styles.padd} />
        </ScrollView>
        {loading ? (
          <View style={styles.loadingCt}>
            <ActivityIndicator color={'#0063ff'} size={32} />
          </View>
        ) : (
          <>
            {/* {posts.map((post, i) => {
              return <Post key={post._id} data={post} />;
            })} */}
            <FlatList
              data={posts}
              onEndReachedThreshold={0.33}
              onEndReached={() => setPageState({
                pageNo: pageState.pageNo + 1,
                pageSize: pageState.pageSize
              })}
              renderItem={({ item }) => (
                <Post
                key={item._id}
                data={item}
            />
        )}
      />
      </>
        )}
      </>
    </ScreenWithTopBar>
  );
}

export default DiscoverScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.White
  },
  cardContainer: {
    padding: 20,
    width: '100%',
    marginLeft: '0%',
    marginTop: '0%',
    borderTopColor: 'white',
    paddingTop: 15
  },
  profileinfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  avatar2: {
    borderWidth: 1,
    borderColor: Colors.White
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    marginLeft: '10%',
    color: 'black'
  },
  mainContent: {
    marginTop: '5%'
  },
  postPic: {
    width: '100%',
    minHeight: 300,
    borderRadius: 10
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '9%'
  },
  cardFooterText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    lineHeight: 18.75,
    color: Colors.Black
  },
  cardFooter2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '7%'
  },
  cardFooterText2: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    color: Colors.Gray600
  },
  tag: {
    backgroundColor: Colors.Gray100,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: '5%'
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Roboto-Medium',
    color: Colors.Black
  },
  eyeView: {
    flexDirection: 'row',
    marginLeft: '35%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewNum: {
    color: 'black',
    fontSize: 16,
    marginLeft: '2%',
    lineHeight: 18.75,
    fontFamily: 'Roboto-Medium'
  },
  subTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 14.52,
    color: 'black',
    marginTop: 10
  },
  searchInput: {
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: Colors.GrayBorder,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    // paddingLeft: 20,
    // paddingRight: 12,
    fontFamily: 'Roboto-Medium',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputt: {
    paddingHorizontal: 15,
    flexGrow: 1,
    color: 'black'
  },
  filtIcon: {
    alignItems: 'center',
    zIndex: 999,
    justifyContent: 'center',
    flexShrink: 0,
    padding: 10
  },
  activity: {
    flexShrink: 0,
    flexGrow: 0,
    marginVertical: 10
    // marginHorizontal: 15,
    // height: 45
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gray100
  },
  itemSelected: {
    backgroundColor: Colors.Secondary
  },
  itemText: {
    fontSize: 14,
    color: Colors.Gray600,
    textAlign: 'center'
  },
  itemTextSelected: {
    color: Colors.White
  },
  padd: {
    padding: 5
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  }
});
