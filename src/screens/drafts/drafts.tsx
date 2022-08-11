import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import DropdownFilter, {
  OptionKey,
  optionsList
} from '../../components/dropdownFilter';
import DropdownMore from '../../components/dropdownMore';
import { Colors } from '../../utils/colors';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { Post } from '~/src/utils/typings/post';
import { removePostPermanently } from '~/src/utils/services/delete-post_service/removePostPermanently.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { GetPostsOfTypeResponse } from '~/src/utils/typings/user-posts_interface/getPosts.interface';
import { getAllPostsOfType } from '~/src/utils/services/user-posts_service/getPosts.service';
import PostRow from '~/src/components/screens/trash-and-drafts/PostRow';

const DraftsScreen = ({ navigation }) => {
  const authUserId = useSelector((root: IRootReducer) => root.auth.user._id);

  const [selectedPostType, setSelectedPostType] = useState<OptionKey>('blog');
  const [posts, setPosts] = useState<GetPostsOfTypeResponse['posts']>([]);
  const [loading, setLoading] = useState(true);

  async function deleteTrashItem(
    postId: string,
    index: number,
    setDeleting: (value: boolean) => void
  ) {
    setDeleting(true);
    const result = await removePostPermanently(postId);
    if (result.data.success) {
      // deleting from posts list
      posts.splice(index, 1);
      setPosts([...posts]);
    }
  }

  async function getData() {
    const projection = 'title';
    setLoading(true);
    const result = await getAllPostsOfType({
      userID: authUserId,
      projection,
      postType: selectedPostType,
      postStatus: 'draft'
    });

    if (result.data.success) {
      setPosts(result.data.posts);
    }

    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [selectedPostType]);

  return (
    <ScreenWithTopBar navigation={navigation}>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Drafts</Text>
          <DropdownFilter
            optionKey={selectedPostType}
            onOptionChange={option => {
              setSelectedPostType(option);
            }}
          />
        </View>
        {loading ? (
          <View style={styles.loadingCt}>
            <ActivityIndicator color={'#0063ff'} size={32} />
          </View>
        ) : posts?.length > 0 ? (
          <ScrollView>
            {posts.map((post, i) => (
              <PostRow
                key={post._id}
                title={post.title}
                postId={post._id}
                suffixAction={({ setLoading: _setLoading }) => (
                  <DropdownMore
                    onDelete={() => deleteTrashItem(post._id, i, _setLoading)}
                    onEdit={() => {}}
                  />
                )}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyMessage}>
            No Draft {optionsList[selectedPostType]}
          </Text>
        )}
      </View>
    </ScreenWithTopBar>
  );
};

const styles = StyleSheet.create({
  pageContainer: {},
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 20,
    backgroundColor: Colors.White
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Black
  },
  loadingCt: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20
  },
  emptyMessage: {
    padding: 10,
    textAlign: 'center'
  }
});

export default DraftsScreen;
