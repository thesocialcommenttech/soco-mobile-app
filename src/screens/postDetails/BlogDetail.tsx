import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PostViewScreenProps } from '~/src/types/navigation/main';
import Loading from '~/src/components/theme/Loading';
import { getPost } from '~/src/utils/services/user-posts_service/getPost.service';
import { GetPostResponse } from '~/src/utils/typings/user-posts_interface/getPost.interface';
import { BlogPost } from '~/src/utils/typings/post';
import PostTitle from '~/src/components/screens/post-view/PostTitle';
import AuthorCard from '~/src/components/screens/post-view/AuthorCard';
import PostAuthorNTimestamp from '~/src/components/screens/post-view/PostAuthorNTimestamp';
import PostComments from '~/src/components/screens/post-view/PostComments';
import PostInteractions from '~/src/components/screens/post-view/PostInteractions';
import PostTags from '~/src/components/screens/post-view/PostTags';
import ScreenWithTopBar from '~/src/components/ScreenWithTopBar';
import { Black } from '~/src/utils/colors';
import EditorView from '~/src/components/editor/EditorView';
import Thumbnail from '~/src/components/theme/Thumbnail';
import { staticFileSrc } from '~/src/utils/methods';
import { useViewIncrementor } from '~/src/lib/view-incrementor';

type PostScreenData = GetPostResponse<
  Pick<
    BlogPost,
    | 'postedOn'
    | 'postedBy'
    | 'title'
    | 'description'
    | 'tags'
    | 'featureImage'
    | 'views'
    | 'comments'
    | 'upvotes'
    | 'downvotes'
    | 'voted'
    | 'isFavorited'
    | 'shares'
    | 'contentJSON'
    | '_id'
  >
>['post'];

export default function BlogDetail() {
  const navigation = useNavigation();
  const route = useRoute<PostViewScreenProps['route']>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostScreenData>();
  useViewIncrementor(post?._id);

  async function fetchData() {
    setLoading(true);

    const result = await getPost<PostScreenData>({
      postID: route.params.post_id,
      postType: 'blog',
      projection:
        'postedOn postedBy title tags featureImage contentJSON views comments upvotes downvotes shares'
    });

    if (result.data.success) {
      setPost(result.data.post);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!post) {
      fetchData();
    }
  }, []);

  return (
    <ScreenWithTopBar navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        <PostTitle title={post?.title} loading={loading} />
        <PostAuthorNTimestamp
          style={styles.MT}
          user={post?.postedBy}
          timestamp={post?.postedOn}
          loading={loading}
        />
        <PostInteractions
          downVotesCount={post?.downvotes?.length}
          upvotesCount={post?.upvotes?.length}
          favourite={post?.isFavorited}
          downVoted={post?.voted === 'down'}
          upVoted={post?.voted === 'up'}
          postId={post?._id}
          postTitle={post?.title}
          postType="artwork"
          style={styles.MT}
          loading={loading}
        />
        <Thumbnail
          calculateWidth={winWidth => winWidth - 30}
          aspectRatio={0.5}
          imageProps={{
            resizeMode: 'cover',
            source: { uri: staticFileSrc(post?.featureImage) },
            style: [styles.artworkImage, styles.MT]
          }}
          loading={loading}
        />
        <EditorView
          value={post?.contentJSON}
          style={styles.MT}
          loading={loading}
        />
        <PostTags tags={post?.tags} style={styles.MT} loading={loading} />
        {!loading && (
          <>
            <AuthorCard
              style={styles.MT}
              author={post?.postedBy}
              post={{ _id: post?._id, type: 'blog' }}
            />
            <PostComments
              commentCount={post?.comments?.length}
              comments={post?.comments}
              postId={post?._id}
              style={styles.MT}
            />
          </>
        )}
      </ScrollView>
    </ScreenWithTopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  MT: { marginTop: 10 },
  postImage: {
    backgroundColor: Black[200]
  },
  artworkImage: {
    borderRadius: 8
  }
});
