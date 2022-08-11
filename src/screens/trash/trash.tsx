import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DropdownFilter, {
  OptionKey,
  optionsList
} from '../../components/dropdownFilter';
import DropdownDelete from '../../components/dropdownDelete';
import { Colors } from '../../utils/colors';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { getAllPostsOfType } from '~/src/utils/services/user-posts_service/getPosts.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { Post } from '~/src/utils/typings/post';
import { GetPostsOfTypeResponse } from '~/src/utils/typings/user-posts_interface/getPosts.interface';
import { removePostPermanently } from '~/src/utils/services/delete-post_service/removePostPermanently.service';
import PostRow from '~/src/components/screens/trash-and-drafts/PostRow';

function TrashPostItemRow(props: {
  postId: Post['_id'];
  title: string;
  onDelete: () => void;
}) {
  async function deleteTrashItem(setDeleting) {
    setDeleting(true);
    const result = await removePostPermanently(props.postId);

    if (result.data.success) {
      props.onDelete?.();
    }
  }

  return (
    <PostRow
      key={props.postId}
      title={props.title}
      postId={props.postId}
      suffixAction={({ setLoading }) => (
        <DropdownDelete
          postId={props.postId}
          onDelete={() => deleteTrashItem(setLoading)}
        />
      )}
    />
  );
}

function TrashScreen({ navigation }) {
  const authUserId = useSelector((root: IRootReducer) => root.auth.user._id);

  const [selectedPostType, setSelectedPostType] = useState<OptionKey>('blog');
  const [posts, setPosts] = useState<GetPostsOfTypeResponse['posts']>([]);
  const [loading, setLoading] = useState(true);

  function onDelete(index: number) {
    posts.splice(index, 1);
    setPosts([...posts]);
  }

  async function getData() {
    const projection = 'title';
    setLoading(true);
    const result = await getAllPostsOfType({
      userID: authUserId,
      projection,
      postType: selectedPostType,
      postStatus: 'trash'
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
          <Text style={styles.headerText}>Trash</Text>
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
              <TrashPostItemRow
                key={post._id}
                title={post.title}
                postId={post._id}
                onDelete={() => onDelete(i)}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyMessage}>
            No Trashed {optionsList[selectedPostType]}
          </Text>
        )}
      </View>
    </ScreenWithTopBar>
  );
}

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

export default TrashScreen;
