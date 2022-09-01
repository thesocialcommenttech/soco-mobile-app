import {
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { SkillVideoPost } from '~/src/utils/typings/post';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { PostViewRoute } from '~/src/utils/typings/stack';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import AuthorCard from '~/src/components/screens/post-view/AuthorCard';
import PostAuthorNTimestamp from '~/src/components/screens/post-view/PostAuthorNTimestamp';
import PostComments from '~/src/components/screens/post-view/PostComments';
import PostDescription from '~/src/components/screens/post-view/PostDescription';
import PostInteractions from '~/src/components/screens/post-view/PostInteractions';
import PostTags from '~/src/components/screens/post-view/PostTags';
import PostTitle from '~/src/components/screens/post-view/PostTitle';
import { staticFileSrc } from '~/src/utils/methods';
import Skeleton from '~/src/components/theme/Skeleton';
import Video from '~/src/components/theme/Video';

type SkillPostScreenData = GetPostResponse<
  Pick<
    SkillVideoPost,
    | 'postedOn'
    | 'postedBy'
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | 'views'
    | 'comments'
    | 'upvotes'
    | 'video'
    | 'downvotes'
    | 'shares'
    | 'voted'
    | 'isFavorited'
    | '_id'
  >
>['post'];

export default function SkillVideoDetail() {
  const navigation = useNavigation();
  const route = useRoute<PostViewRoute>();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<SkillPostScreenData>();

  async function fetchData() {
    setLoading(true);

    const result = await getPost<SkillPostScreenData>({
      postID: route.params.post_id,
      postType: 'skill',
      projection:
        'postedOn postedBy title description tags featureImage video views comments upvotes downvotes shares'
    });

    if (result.data.success) {
      setPost(result.data.post);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ScrollView>
        <Video videoUrl={post?.video} loading={loading} />
        <View style={styles.container}>
          <PostTitle title={post?.title} loading={loading} />
          <PostAuthorNTimestamp
            style={styles.MT}
            profileImage={post?.postedBy.profileImage}
            name={post?.postedBy.name}
            timestamp={post?.postedOn as string}
            authorId={post?.postedBy._id}
            loading={loading}
          />
          <PostInteractions
            downVotesCount={post?.downvotes.length}
            upvotesCount={post?.upvotes.length}
            favourite={post?.isFavorited}
            downVoted={post?.voted === 'down'}
            upVoted={post?.voted === 'up'}
            postId={post?._id}
            style={styles.MT}
            loading={loading}
          />
          <PostDescription
            description={post?.description}
            style={styles.MT}
            loading={loading}
          />
          <PostTags tags={post?.tags} style={styles.MT} loading={loading} />
          <AuthorCard style={styles.MT} author={post?.postedBy} />
          <PostComments
            commentCount={post?.comments?.length}
            comments={post?.comments}
            postId={post?._id}
            style={styles.MT}
          />
        </View>
      </ScrollView>
    </ScreenWithTopBar>
  );
}

const videoStyles = ({ winW, winH }) => ({
  width: winW,
  height: winW / (16 / 9)
});

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  MT: { marginTop: 10 }
});
